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
import { ShowOverlay, ShowSpinner, ShowMsg } from "../../shared/shared.actions";
import {
  FavoritesLoaded,
  DeleteFromFavorites
} from "../../movies/favorites.actions";

export interface OtherUser {
  user: User;
  favoriteIds: string[];
}

@Injectable()
export class FavoritesService {
  errMsg = "An error ocurred while fetching the data.";
  userId: string;
  favorites: AngularFireList<MovieDetails>;

  constructor(
    private store: Store<AppState>,
    private afDb: AngularFireDatabase,
    private router: Router
  ) {
    this.store
      .pipe(select(selectUserUid))
      .subscribe(uid => (this.userId = uid));
  }

  handleStart(type = "overlay") {
    if (type === "overlay") {
      this.store.dispatch(new ShowOverlay({ showOverlay: true }));
    } else {
      this.store.dispatch(new ShowSpinner({ showSpinner: true }));
    }
  }

  handleSuccess() {}

  handleError(msg = this.errMsg) {
    this.store.dispatch(
      new ShowMsg({
        msg: {
          title: "Error",
          msg,
          color: "red"
        }
      })
    );
  }

  getFavorites() {
    const url = `moviedb/users/${this.userId}/favorites`;
    this.favorites = this.afDb.list(url);
    this.favorites
      .snapshotChanges()
      .pipe(
        shareReplay(),
        tap(actions => {
          // throw new Error();
        }),
        catchError(actions => {
          this.handleError();
          return of(null);
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
          this.store.dispatch(new FavoritesLoaded({ favoritesList }));
        })
      )
      .subscribe(() => {});
  }

  async addToFavorites(movie: MovieDetails, route = null) {
    this.handleStart();
    const url = `moviedb/users/${this.userId}/favorites`;
    this.favorites = this.afDb.list(url);
    await this.favorites.push(movie);
    if (route) {
      this.router.navigateByUrl(route);
    }
    this.handleSuccess();
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
    this.handleSuccess();
    this.store.dispatch(new DeleteFromFavorites({ movieId }));
  }
}
