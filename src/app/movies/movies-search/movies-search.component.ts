import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { Observable } from "rxjs";
import { tap, filter, first } from "rxjs/operators";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import {
  MoviesRequested,
  MoviesLoaded,
  MovieDetailsRequested
} from "../movie.actions";
import { FavoritesRequested, FavoritesLoaded } from "../favorites.actions";
import {
  selectFavorites,
  selectFilteredMovieList,
  createMovieDetails
} from "../movies.selector";
// Models
import { Movie } from "../../models/movie.model";
import { MovieDetails } from "../../models/movie-details.model";
import { MovieKeys } from "../../models/movie-keys.model";
import { IconBtn } from "../../models/icon-btn.model";
// Services
import { FavoritesService } from "../../core/services/favorites.service";
import { MovieDbService } from "../../core/services/moviedb.service";
import { ShowOverlay } from "../../shared/shared.actions";

@Component({
  selector: "app-movies-search",
  templateUrl: "./movies-search.component.html",
  styleUrls: ["./movies-search.component.css"]
})
export class MoviesSearchComponent implements OnInit {
  movieList$: Observable<Movie[]>;

  // Card Inputs
  leftBtn: IconBtn = { text: "View", icon: "fa fa-eye" };
  rightBtn: IconBtn = { text: "Favorite", icon: "fas fa-heart" };

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private favoritesService: FavoritesService,
    private movieDbService: MovieDbService
  ) {}

  ngOnInit() {
    this.loadDataFromStorage();
    this.movieList$ = this.store.pipe(select(selectFilteredMovieList));
  }

  loadDataFromStorage() {
    try {
      const movies = JSON.parse(localStorage.getItem("movies"));
      const favorites = JSON.parse(localStorage.getItem("favorites"));

      if (favorites) {
        console.log("Loading Favorites from local storage");
        this.store.dispatch(
          new FavoritesLoaded({
            favoritesList: favorites,
            from: "FavoritesLoadedFromLocalStorageSP"
          })
        );
        // If no favorites we do not want to load movies from local storage
        // because an api call for favorites will take time and when the
        // favorites arrive there will be a flash of movies disappearing as
        // we filter out favorite movies from movie list
        if (movies) {
          console.log("Loading Movies from local storage");
          this.store.dispatch(
            new MoviesLoaded({
              movieList: movies,
              from: "MoviesLoadedFromLocalStorageSP"
            })
          );
        }
      } else {
        console.log("Fetching Favorites from the server");
        this.getFavorites();
      }
    } catch (err) {}
  }

  // API Calls and Populate the Store
  getFavorites() {
    this.store
      .pipe(
        select(selectFavorites),
        filter((favorites: MovieDetails[]) => {
          // console.log("Movie SP filter:", favorites);
          if (!favorites) {
            this.store.dispatch(new FavoritesRequested("FavoritesRequestedSP"));
            this.favoritesService.getFavorites();
          }
          return favorites !== null;
        }),
        first(),
        tap((favorites: MovieDetails[]) => {
          // console.log("Movie SP tap:", favorites)
        })
      )
      .subscribe(
        () => {},
        err => {},
        () => {
          // console.log("STORE: selectFavorites - MoviesSearchComponent Complete")
        }
      );
  }

  // ---------------- CB Events ---------------------

  // Search Box
  onSearchChanged(searchTerm: string) {
    this.store.dispatch(new MoviesRequested());
    this.movieDbService.getListOfMovies(searchTerm);
  }

  // Card
  handleView(keys: MovieKeys) {
    this.router.navigateByUrl(`/movies/${keys.id}`);
  }

  addToFavorites(keys: MovieKeys) {
    this.store.dispatch(
      new ShowOverlay({ showOverlay: true, from: "ShowOverlaySP" })
    );
    this.store.dispatch(new MovieDetailsRequested("MovieDetailsRequestedSP"));
    this.movieDbService
      .getMovieDetails(keys.id)
      .pipe(first())
      .subscribe(
        (details: MovieDetails) => {
          const movieDetails: MovieDetails = createMovieDetails(details);
          // console.log("movie details", movieDetails);

          this.favoritesService.addToFavorites(movieDetails);
        },
        err => console.log("addToFavorites SP", err),
        () => {
          // console.log("addToFavorites Complete")
        }
      );
  }
}
