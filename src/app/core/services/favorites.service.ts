import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { map, tap } from "rxjs/operators";
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
import { ShowOverlay, ShowSpinner } from "../../shared/shared.actions";
import { GetFavorites, DeleteFromFavorites } from "../../movies/movie.actions";

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
        tap((favorites: MovieDetails[]) => {
          this.store.dispatch(new ShowSpinner({ showSpinner: false }));
          this.store.dispatch(new GetFavorites({ favorites }));
        })
      )
      .subscribe(() => {});
  }

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
}
