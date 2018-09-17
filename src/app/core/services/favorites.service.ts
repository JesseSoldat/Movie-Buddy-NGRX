import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { map, tap } from "rxjs/operators";
// Lodash
import { intersection, difference, orderBy } from "lodash";
// Firebase
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "@angular/fire/database";
// Models
import { MovieDetails } from "../../models/movie-details.model";
import { User } from "../../models/user.model";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectUserUid } from "../../auth/auth.selectors";
// Actions
import { ShowOverlay } from "../../shared/actions/shared.actions";
import { GetFavorites, DeleteFromFavorites } from "../../movies/movie.actions";

export interface Favorites {
  favorites: Map<string, MovieDetails>;
}

export interface FbUser {
  key: string;
  favorites: Favorites;
  user: User;
}

export interface OtherUser {
  user: User;
  favoriteIds: string[];
}

export interface MatchedUser {
  name: string;
  uid: string;
  isMatch: string[];
  noMatch: string[];
  matched: number;
  unmatched: number;
}

@Injectable()
export class FavoritesService {
  userId: string;
  favorites: AngularFireList<MovieDetails>;
  myList: string[]; // current users favorites
  otherUsersList: any;
  otherUsersIds: OtherUser[];
  matchedUserList: MatchedUser[];

  constructor(
    private store: Store<AppState>,
    private afDb: AngularFireDatabase,
    private router: Router
  ) {
    this.store
      .pipe(select(selectUserUid))
      .subscribe(uid => (this.userId = uid));
  }

  getFavorites() {
    const url = `moviedb/users/${this.userId}/favorites`;
    this.favorites = this.afDb.list(url);
    this.favorites
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => ({
            key: action.key,
            ...action.payload.val()
          }))
        ),
        tap((favorites: MovieDetails[]) =>
          this.store.dispatch(new GetFavorites({ favorites }))
        )
      )
      .subscribe();
  }

  getFavoriteDetails(movieId: number) {}

  async addToFavorites(movie: MovieDetails, route = null) {
    this.store.dispatch(new ShowOverlay({ showOverlay: true }));
    const url = `moviedb/users/${this.userId}/favorites`;
    this.favorites = this.afDb.list(url);
    await this.favorites.push(movie);
    if (route) {
      this.router.navigateByUrl(route);
    }
    this.store.dispatch(new ShowOverlay({ showOverlay: false }));
  }

  async removeFromFavorites(
    key: string,
    movieId: string | number,
    page = null
  ) {
    this.store.dispatch(new ShowOverlay({ showOverlay: true }));
    const url = `moviedb/users/${this.userId}/favorites`;
    this.favorites = this.afDb.list(url);
    await this.favorites.remove(key);

    if (page === "details") {
      this.router.navigateByUrl("/movies/favorites");
    }
    this.store.dispatch(new DeleteFromFavorites({ movieId }));
    this.store.dispatch(new ShowOverlay({ showOverlay: false }));
  }

  getOtherUsersLists() {
    const url = "moviedb/users";
    this.otherUsersList = this.afDb.list(url);
    this.otherUsersList
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          const usersList: FbUser[] = actions.map(action => ({
            key: action.key,
            ...action.payload.val()
          }));
          return usersList;
        })
      )
      .subscribe(usersList => {
        // Clear previous state
        this.otherUsersIds = [];
        usersList.forEach((user: FbUser) => {
          // My List
          if (user.key === this.userId) {
            // console.log(user);
            this.myList = this.getFavoriteIds(user.favorites);
            // console.log(this.myList);
          }
          // Others List
          else {
            const otherUser: OtherUser = {
              user: user.user,
              favoriteIds: []
            };
            otherUser.favoriteIds = this.getFavoriteIds(user.favorites);
            this.otherUsersIds.push(otherUser);
          }
        });
        // console.log("others", this.otherUsersIds);
        this.createUserMatches();
      });
  }

  getFavoriteIds(favorites) {
    const temp = [];
    for (let key in favorites) {
      if (favorites.hasOwnProperty(key)) {
        temp.push(favorites[key].id);
      }
    }
    return temp;
  }

  createUserMatches() {
    this.matchedUserList = [];
    this.otherUsersIds.forEach(otherUser => {
      const matched: MatchedUser = {
        name: otherUser.user.username,
        uid: otherUser.user.uid,
        isMatch: intersection(otherUser.favoriteIds, this.myList),
        noMatch: difference(otherUser.favoriteIds, this.myList),
        matched: 0,
        unmatched: 0
      };

      matched.matched = matched.isMatch.length;
      matched.unmatched = matched.noMatch.length;

      this.matchedUserList.push(matched);
    });

    var data = orderBy(this.matchedUserList, ["matched"], ["desc"]);
    console.log(data);
  }
}
