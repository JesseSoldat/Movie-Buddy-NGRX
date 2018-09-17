import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
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
import { GetFavorites, DeleteFromFavorites } from "../../movies/movie.actions";

@Injectable()
export class FavoritesService {
  userId: string;
  favorites: AngularFireList<MovieDetails>;
  otherUsersList: any;

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
          const usersList = actions.map(action => ({
            key: action.key,
            ...action.payload.val()
          }));
          console.log(usersList);
        })
      )
      .subscribe();
  }
}
