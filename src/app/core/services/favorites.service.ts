import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { map, tap, first, catchError } from "rxjs/operators";
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
import {
  FavoritesLoaded,
  FavoritesDeleted,
  FavoritesAdded
} from "../../movies/favorites.actions";
// Utils
import {
  errMsg,
  showOverlay,
  hideOverlay
} from "../../utils/ui.action.dispatchers";

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
  favoritesLoadedFS = "FavoritesLoadedFS";
  favoritesDeletedFS = "FavoritesDeletedFS";
  favoritesAddedFS = "FavoritesAddedFS";

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
      .subscribe(uid => (this.userId = uid), err => {});
  }

  // Helpers
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
          errMsg(this.store, this.fromMsg);
          return of([]);
        }),
        map(actions => this.mapActionsToList(actions)),
        tap((favoritesList: MovieDetails[]) => {
          this.store.dispatch(
            new FavoritesLoaded({ favoritesList, from: this.favoritesLoadedFS })
          );
        })
      )
      .subscribe(
        favoritesList => {},
        err => {},
        () => {
          // this.handleComplete("getFavorites")
        }
      );
  }

  addToFavorites(movie: MovieDetails, route = null) {
    this.favorites = this.afDb.list(`moviedb/users/${this.userId}/favorites`);
    this.favorites.push(movie);

    this.favorites
      .snapshotChanges()
      .pipe(
        first(),
        map(actions => this.mapActionsToList(actions)),
        tap((favoritesList: MovieDetails[]) => {
          this.store.dispatch(
            new FavoritesAdded({ favoritesList, from: this.favoritesAddedFS })
          );
        })
      )
      .subscribe(
        () => {
          if (route) {
            this.router.navigateByUrl(route);
          }
          hideOverlay(this.store, this.fromOverlay);
        },
        err =>
          errMsg(
            this.store,
            this.fromMsg,
            "An error ocurred while adding the movie to your favorites"
          )
      );
  }

  removeFromFavorites(key: string, movieId: number, page = null) {
    showOverlay(this.store, this.fromOverlay);

    this.favorites = this.afDb.list(`moviedb/users/${this.userId}/favorites`);
    this.favorites.remove(key);

    if (page === "details") {
      this.router.navigateByUrl("/movies/favorites");
    }
    this.store.dispatch(
      new FavoritesDeleted({ movieId, from: this.favoritesDeletedFS })
    );
    hideOverlay(this.store, this.fromOverlay);
  }
}
