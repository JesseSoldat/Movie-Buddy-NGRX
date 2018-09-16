import { Injectable } from "@angular/core";
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
import { selectUser } from "../../auth/auth.selectors";
import { User } from "../../models/user.model";

@Injectable()
export class FavoritesService {
  user: User;
  favorites: AngularFireList<MovieDetails>;

  constructor(
    private store: Store<AppState>,
    private afDb: AngularFireDatabase
  ) {
    this.store.pipe(select(selectUser)).subscribe(user => (this.user = user));
  }

  addToFavorites(movie: MovieDetails) {
    console.log(movie);
    console.log(this.user);
    const url = `moviedb/users/${this.user.uid}/${
      this.user.username
    }/favorites`;
    this.favorites = this.afDb.list(url);
    this.favorites.push(movie).then(item => {
      console.log("Saved", item.key);
    });
  }
}
