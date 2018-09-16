import { Component, OnInit } from "@angular/core";
import { FavoritesService } from "../../core/services/favorites.service";
import { Observable } from "rxjs";
import { Movie } from "../../models/movie.model";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectMovieList, selectFilteredMovieList } from "../movies.selector";

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
    this.favoritesService.getFavorites();
    this.movieList$ = this.store.pipe(select(selectFilteredMovieList));
  }
}
