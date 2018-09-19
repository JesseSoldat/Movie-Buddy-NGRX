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
  fromMsg = "ShowMsgFS";
  fromOverlay = "ShowOverlayFS";
  FavoritesLoadedFS = "FavoritesLoadedFS";
  FavoritesDeletedFS = "FavoritesDeletedFS";
  FavoritesAddedFS = "FavoritesAddedFS";

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

  showOverlay() {
    this.store.dispatch(createShowOverlay(this.fromOverlay, true));
  }

  hideOverlay() {
    this.store.dispatch(createShowOverlay(this.fromOverlay, false));
  }

  showErrMsg(msg = null) {
    this.store.dispatch(createErrorMsg(this.fromMsg, msg));
  }

  handleComplete(source) {
    // console.log(`${source} Observable has completed`);
  }

  mapActionsToList(actions) {
    return actions
      ? actions.map(action => ({
          key: action.key,
          ...action.payload.val()
        }))
      : actions;
  }

  // user first() to get the data once and
  // not listen to changes from firebase
  getFavorites() {
    this.favorites = this.afDb.list(`moviedb/users/${this.userId}/favorites`);

    this.favorites
      .snapshotChanges()
      .pipe(
        first(),
        tap(actions => {
          // throw new Error();
        }),
        catchError(actions => {
          this.showErrMsg();
          return of([]);
        }),
        map(actions => this.mapActionsToList(actions)),
        tap((favoritesList: MovieDetails[]) => {
          this.store.dispatch(
            new FavoritesLoaded({ favoritesList, from: this.FavoritesLoadedFS })
          );
        })
      )
      .subscribe(
        favoritesList => {},
        err => {},
        () => this.handleComplete("getFavorites")
      );
  }

  addToFavorites(movie: MovieDetails, route = null) {
    this.favorites = this.afDb.list(`moviedb/users/${this.userId}/favorites`);
    this.favorites.push(movie);

    if (route) {
      this.router.navigateByUrl(route);
    }

    this.favorites
      .snapshotChanges()
      .pipe(
        first(),
        map(actions => this.mapActionsToList(actions)),
        tap((favoritesList: MovieDetails[]) => {
          this.store.dispatch(
            new FavoritesAdded({ favoritesList, from: this.FavoritesAddedFS })
          );
        })
      )
      .subscribe(
        () => this.hideOverlay(),
        err =>
          this.showErrMsg(
            "An error ocurred while adding the movie to your favorites"
          )
      );
  }

  removeFromFavorites(key: string, movieId: number, page = null) {
    this.showOverlay();
    this.favorites = this.afDb.list(`moviedb/users/${this.userId}/favorites`);
    this.favorites.remove(key);

    if (page === "details") {
      this.router.navigateByUrl("/movies/favorites");
    }
    this.store.dispatch(
      new FavoritesDeleted({ movieId, from: this.FavoritesDeletedFS })
    );
    this.hideOverlay();
  }
}
