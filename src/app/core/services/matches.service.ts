import { Injectable } from "@angular/core";
// Rxjs
import { map, first } from "rxjs/operators";
// Lodash
import { intersection, difference, orderBy } from "lodash";
// Firebase
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectUserUid } from "../../auth/auth.selectors";
import {
  GetMatchedUsersLoaded,
  GetMatchedUserLoaded,
  GetUserFavoriteIdsLoaded,
  GetMatchedUserDetailsLoaded
} from "../../matches/matches.action";
// Models
import { User } from "../../models/user.model";
import { MatchedUser } from "../../models/matched-user.model";
import { FbUser } from "../../models/fb-user.model";

export interface OtherUser {
  user: User;
  favoriteIds: string[];
}

@Injectable()
export class MatchesService {
  userId: string;
  currentUser: AngularFireObject<FbUser>; // currently logged in user
  matchedUser: AngularFireObject<FbUser>; // single matched user
  allUsersAndFavoritesList: AngularFireList<FbUser>; // all users
  // Ids of favorites only
  myListIds: string[]; // current users favorites ids
  matchedUsersIds: OtherUser[]; // matched users favorites ids

  matchedUserList: MatchedUser[]; // all matched users with data formatted

  matchedUserFavorites: AngularFireList<any>; // all of a single matched users favorites

  // From Action Types
  getMatchedUsersLoadedMS = "GetMatchedUsersLoadedMS";
  getMatchedUserLoadedMS = "GetMatchedUserLoadedMS";
  getUserFavoriteIdsLoadedMS = "GetUserFavoriteIdsLoadedMS";
  getMatchedUserDetailsLoadedMS = "GetMatchedUserDetailsLoadedMS";

  constructor(
    private store: Store<AppState>,
    private afDb: AngularFireDatabase
  ) {
    this.store
      .pipe(select(selectUserUid))
      .subscribe(uid => (this.userId = uid));
  }

  // Helpers
  mapActionsToList(actions) {
    return actions
      ? actions.map(action => ({
          key: action.key,
          ...action.payload.val()
        }))
      : actions;
  }

  // Get the current users favorite movie ids
  getCurrentUserFavoriteIds() {
    this.currentUser = this.afDb.object(`moviedb/users/${this.userId}`);

    this.currentUser.snapshotChanges().subscribe(action => {
      const user: FbUser = action.payload.val();

      if (user && user.favorites) {
        this.myListIds = this.getFavoriteIds(user.favorites);

        this.store.dispatch(
          new GetUserFavoriteIdsLoaded({
            userFavoriteIds: this.myListIds,
            from: this.getUserFavoriteIdsLoadedMS
          })
        );
      }
    });
  }

  // Get a single user and their movies
  getOtherUserMovies(uid: string): void {
    this.matchedUser = this.afDb.object(`moviedb/users/${uid}`);

    this.matchedUser.snapshotChanges().subscribe(action => {
      const matchedUser: FbUser = action.payload.val();
      matchedUser["key"] = action.key;
      this.store.dispatch(
        new GetMatchedUserLoaded({
          matchedUser,
          from: this.getMatchedUserLoadedMS
        })
      );
    });
  }

  // Get a single user and the detail view of a movie
  getOtherUserMovieDetails(uid: string, movieId: number) {
    this.matchedUserFavorites = this.afDb.list(
      `moviedb/users/${uid}/favorites`
    );

    this.matchedUserFavorites
      .snapshotChanges()
      .pipe(
        first(),
        map(actions => this.mapActionsToList(actions))
      )
      .subscribe(favorites => {
        const matchedMovie = favorites.find(obj => obj.id === movieId);

        this.store.dispatch(
          new GetMatchedUserDetailsLoaded({
            matchedMovie,
            from: this.getMatchedUserDetailsLoadedMS
          })
        );
      });
  }

  // List All Users including current user and their movies
  getOtherUsersLists(): void {
    this.allUsersAndFavoritesList = this.afDb.list("moviedb/users");

    this.allUsersAndFavoritesList
      .snapshotChanges()
      .pipe(
        first(),
        map(actions => this.mapActionsToList(actions))
      )
      .subscribe(usersList => {
        // Clear previous state
        this.myListIds = [];
        this.matchedUsersIds = [];

        usersList.forEach((user: FbUser) => {
          // My List
          if (user.key === this.userId) {
            this.myListIds = this.getFavoriteIds(user.favorites);
            this.store.dispatch(
              new GetUserFavoriteIdsLoaded({
                userFavoriteIds: this.myListIds,
                from: this.getUserFavoriteIdsLoadedMS
              })
            );
          }
          // Others List
          else {
            const otherUser: OtherUser = {
              user: user.user,
              favoriteIds: []
            };
            otherUser.favoriteIds = this.getFavoriteIds(user.favorites);
            this.matchedUsersIds.push(otherUser);
          }
        });
        // console.log("others", this.otherUsersIds);
        this.createUserMatches();
      });
  }

  getFavoriteIds(favorites): string[] {
    const temp = [];
    for (let key in favorites) {
      if (favorites.hasOwnProperty(key)) {
        temp.push(favorites[key].id);
      }
    }
    return temp;
  }

  createUserMatches(): void {
    this.matchedUserList = [];
    this.matchedUsersIds.forEach(otherUser => {
      const matched: MatchedUser = {
        username: otherUser.user.username,
        uid: otherUser.user.uid,
        isMatch: intersection(otherUser.favoriteIds, this.myListIds),
        noMatch: difference(otherUser.favoriteIds, this.myListIds),
        matched: 0,
        unmatched: 0
      };

      matched.matched = matched.isMatch.length;
      matched.unmatched = matched.noMatch.length;

      this.matchedUserList.push(matched);
    });

    const matches = orderBy(this.matchedUserList, ["matched"], ["desc"]);

    this.store.dispatch(
      new GetMatchedUsersLoaded({ matches, from: this.getMatchedUsersLoadedMS })
    );
  }
}
