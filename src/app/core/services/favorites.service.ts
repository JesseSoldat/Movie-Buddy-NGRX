import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { map, tap, first, shareReplay, catchError } from "rxjs/operators";
import { of } from "rxjs";
// Firebase
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
// Models
import { MovieDetails } from "../../models/movie-details.model";
import { User } from "../../models/user.model";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectUserUid } from "../../auth/auth.selectors";
// Actions
import { ShowOverlay, ShowMsg } from "../../shared/shared.actions";
import {
  FavoritesLoaded,
  FavoritesDeleted,
  FavoritesAdded
} from "../../movies/favorites.actions";
// Utils
import { createErrorMsg } from "../../utils/createErrorMsg";
import { createShowOverlay } from "../../utils/createShowOverlay";

export interface OtherUser {
  user: User;
  favoriteIds: string[];
}

@Injectable()
export class FavoritesService {
  userId: string;
  favorites: AngularFireList<MovieDetails>;

  constructor(
    private store: Store<AppState>,
    private afDb: AngularFireDatabase,
    private router: Router
  ) {
    this.store
      .pipe(
        select(selectUserUid),
        first()
      )
      .subscribe(
        uid => (this.userId = uid),
        err => console.log("Err: Favorites Service - selectUserUid", err),
        () => {
          // console.log("Complete Favorites Service - selectUserUid")
        }
      );
  }

  handleStart() {
    const from = "ShowOverlayFS";
    this.store.dispatch(createShowOverlay(from, true));
  }

  handleSuccess(showOverlay = true) {
    if (showOverlay) {
      const from = "ShowOverlayFS";
      this.store.dispatch(createShowOverlay(from, false));
    }
  }

  handleError(msg?) {
    const from = "ShowMsgFS";
    this.store.dispatch(createErrorMsg(msg, from));
  }

  handleComplete(source) {
    // console.log(`${source} Observable has completed`);
  }

  // firebase the Observable send the complete msg
  // but the observable get recreated
  // if using first() the observable is TRULY completed
  getFavorites() {
    const url = `moviedb/users/${this.userId}/favorites`;
    this.favorites = this.afDb.list(url);
    this.favorites
      .snapshotChanges()
      .pipe(
        first(),
        tap(actions => {
          // throw new Error();
        }),
        catchError(actions => {
          this.handleError();
          return of([]);
        }),
        map(
          actions =>
            actions
              ? actions.map(action => ({
                  key: action.key,
                  ...action.payload.val()
                }))
              : actions
        ),
        tap((favoritesList: MovieDetails[]) => {
          this.store.dispatch(
            new FavoritesLoaded({ favoritesList, from: "FavoritesLoadedFS" })
          );
        })
      )
      .subscribe(() => {
        this.handleSuccess(false),
          () => {},
          this.handleComplete("getFavorites");
      });
  }

  extractList() {}

  async addToFavorites(movie: MovieDetails, route = null) {
    this.handleStart();
    const url = `moviedb/users/${this.userId}/favorites`;
    this.favorites = this.afDb.list(url);
    await this.favorites.push(movie);
    this.store.dispatch;
    if (route) {
      this.router.navigateByUrl(route);
    }
    this.handleSuccess();
    this.favorites
      .snapshotChanges()
      .pipe(
        first(),
        map(
          actions =>
            actions
              ? actions.map(action => ({
                  key: action.key,
                  ...action.payload.val()
                }))
              : actions
        ),
        tap((favoritesList: MovieDetails[]) => {
          this.store.dispatch(new FavoritesAdded({ favoritesList }));
          this.handleSuccess();
        })
      )
      .subscribe();
  }

  async removeFromFavorites(
    key: string,
    movieId: string | number,
    page = null
  ) {
    this.handleStart();
    const url = `moviedb/users/${this.userId}/favorites`;
    this.favorites = this.afDb.list(url);
    await this.favorites.remove(key);

    if (page === "details") {
      this.router.navigateByUrl("/movies/favorites");
    }
    this.store.dispatch(new FavoritesDeleted({ movieId }));
    this.handleSuccess();
  }
}
