import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
// Firebase
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "@angular/fire/database";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { MovieDetails } from "../../models/movie-details.model";
import { selectUserUid } from "../../auth/auth.selectors";
// Actions
import { ShowOverlay } from "../../shared/actions/shared.actions";
import { GetFavorites } from "../../movies/movie.actions";

@Injectable()
export class FavoritesService {
  userId: string;
  favorites: AngularFireList<MovieDetails>;

  constructor(
    private store: Store<AppState>,
    private afDb: AngularFireDatabase
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

  addToFavorites(movie: MovieDetails) {
    this.store.dispatch(new ShowOverlay({ showOverlay: true }));
    const url = `moviedb/users/${this.userId}/favorites`;
    this.favorites = this.afDb.list(url);
    this.favorites.push(movie).then(item => {
      // console.log("Saved", item.key);
      this.store.dispatch(new ShowOverlay({ showOverlay: false }));
    });
  }

  removeFromFavorites(key: string) {
    this.store.dispatch(new ShowOverlay({ showOverlay: true }));
    const url = `moviedb/users/${this.userId}/favorites`;
    this.favorites = this.afDb.list(url);
    this.favorites.remove(key).then(() => {
      this.store.dispatch(new ShowOverlay({ showOverlay: false }));
    });
  }
}
