import { Component, OnInit } from "@angular/core";
// Rxjs
import { Observable } from "rxjs";
import { tap, filter, first } from "rxjs/operators";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { FavoritesRequested } from "../favorites.actions";
import { selectFavorites, selectFilteredMovieList } from "../movies.selector";
// Models
import { Movie } from "../../models/movie.model";
// Services
import { FavoritesService } from "../../core/services/favorites.service";

@Component({
  selector: "app-movies-search",
  templateUrl: "./movies-search.component.html",
  styleUrls: ["./movies-search.component.css"]
})
export class MoviesSearchComponent implements OnInit {
  movieList$: Observable<Movie[]>;

  constructor(
    private store: Store<AppState>,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.store
      .pipe(
        select(selectFavorites),
        filter(favorites => {
          console.log("Movie SP filter:", favorites);
          if (!favorites) {
            this.store.dispatch(new FavoritesRequested("FavoritesRequestedSP"));
            this.favoritesService.getFavorites();
          }
          return favorites !== null;
        }),
        first(),
        tap(favorites => console.log("Movie SP tap:", favorites))
      )
      .subscribe(
        () => {},
        err => {},
        () => console.log("STORE: selectFavorites Complete")
      );

    this.movieList$ = this.store.pipe(select(selectFilteredMovieList));
  }
}
