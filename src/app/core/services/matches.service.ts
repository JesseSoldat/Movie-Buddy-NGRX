import { Injectable } from "@angular/core";
// Rxjs
import { map } from "rxjs/operators";
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
import { GetMatches, GetMatch } from "../../matches/matches.action";
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
  myList: string[]; // current users favorites
  otherUser: AngularFireObject<FbUser>; // single matched user
  otherUsersList: AngularFireList<FbUser>; // all users
  otherUsersIds: OtherUser[]; // others users movie ids
  matchedUserList: MatchedUser[]; // all user data formatted

  constructor(
    private store: Store<AppState>,
    private afDb: AngularFireDatabase
  ) {
    this.store
      .pipe(select(selectUserUid))
      .subscribe(uid => (this.userId = uid));
  }

  // Single user and their movies
  getOtherUserMovies(uid: string) {
    const url = `moviedb/users/${uid}`;
    this.otherUser = this.afDb.object(url);

    this.otherUser.snapshotChanges().subscribe(action => {
      const match: FbUser = action.payload.val();
      match["key"] = action.key;
      console.log(match);
      this.store.dispatch(new GetMatch({ match }));
    });
  }

  // List of other Users and their movies
  getOtherUsersLists() {
    const url = "moviedb/users";
    this.otherUsersList = this.afDb.list(url);
    this.otherUsersList
      .snapshotChanges()
      .pipe(
        map(actions => {
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
        username: otherUser.user.username,
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

    const matches = orderBy(this.matchedUserList, ["matched"], ["desc"]);

    this.store.dispatch(new GetMatches({ matches }));
  }
}
