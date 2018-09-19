import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { Observable } from "rxjs";
import { tap, filter, first } from "rxjs/operators";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
// Actions
import {
  MoviesRequested,
  MoviesLoaded,
  MovieDetailsRequested,
  MovieDetailsCleared
} from "../movie.actions";
import { FavoritesRequested, FavoritesLoaded } from "../favorites.actions";
// Selectors
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
// Utils
import {
  errMsg,
  showOverlay,
  hideOverlay
} from "../../utils/ui.action.dispatchers";

@Component({
  selector: "app-movies-search",
  templateUrl: "./movies-search.component.html",
  styleUrls: ["./movies-search.component.css"]
})
export class MoviesSearchComponent implements OnInit {
  movieList$: Observable<Movie[]>;
  // From Action Types
  fromMsg = "ShowMsgMSP";
  fromShowOverlay = "ShowOverlayMSP";
  moviesRequested = "MoviesRequestedMSP";
  movieDetailsRequested = "MovieDetailsRequestedMSP";
  favoritesRequestedMSP = "FavoritesRequestedMSP";
  favoritesLoadedFromLocalStorageMSP = "FavoritesLoadedFromLocalStorageMSP";
  moviesLoadedFromLocalStorageMSP = "MoviesLoadedFromLocalStorageMSP";
  movieDetailsClearedMSP = "movieDetailsClearedMSP";

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
    this.store.dispatch(
      new FavoritesRequested({ from: this.favoritesRequestedMSP })
    );
    this.loadDataFromStorage();

    this.movieList$ = this.store.pipe(select(selectFilteredMovieList));
  }

  // API Calls and Populate the Store
  getFavorites() {
    this.store
      .pipe(
        select(selectFavorites),
        tap(favorites => {
          // throw new Error();
        }),
        filter((favorites: MovieDetails[]) => {
          // console.log("Movie SP filter:", favorites);
          if (!favorites) {
            this.favoritesService.getFavorites();
          }
          return favorites !== null;
        }),
        first(),
        tap((favorites: MovieDetails[]) => {
          // console.log("Movie SP tap:", favorites)
        })
      )
      .subscribe(() => {}, err => errMsg(this.store, this.fromMsg));
  }

  loadDataFromStorage() {
    try {
      const movies = JSON.parse(localStorage.getItem("movies"));
      const favorites = JSON.parse(localStorage.getItem("favorites"));

      if (favorites) {
        this.store.dispatch(
          new FavoritesLoaded({
            favoritesList: favorites,
            from: this.favoritesLoadedFromLocalStorageMSP
          })
        );
        // If no favorites we do not want to load movies from local storage
        // because an api call for favorites will take time and when the
        // favorites arrive there will be a flash of movies disappearing as
        // we filter out favorite movies from movie list
        if (movies) {
          this.store.dispatch(
            new MoviesLoaded({
              movieList: movies,
              from: this.moviesLoadedFromLocalStorageMSP
            })
          );
        }
      }
      //Fetch Favorites from the server"
      else {
        this.getFavorites();
      }
    } catch (err) {
      this.getFavorites();
    }
  }

  // ---------------- CB Events ---------------------

  // Search Box
  onSearchChanged(searchTerm: string) {
    this.store.dispatch(new MoviesRequested({ from: this.moviesRequested }));
    this.movieDbService.getListOfMovies(searchTerm);
  }

  // Card
  handleView(keys: MovieKeys) {
    this.router.navigateByUrl(`/movies/${keys.id}`);
  }

  addToFavorites(keys: MovieKeys) {
    showOverlay(this.store, this.fromShowOverlay);

    this.store.dispatch(
      new MovieDetailsRequested({ from: this.movieDetailsRequested })
    );

    this.movieDbService.getMovieDetails(keys.id).subscribe(
      (details: MovieDetails) => {
        const movieDetails: MovieDetails = createMovieDetails(details);
        this.store.dispatch(
          new MovieDetailsCleared({ from: this.movieDetailsClearedMSP })
        );

        this.favoritesService.addToFavorites(movieDetails);
      },
      err => {
        const msg = "An error ocurred while trying to add the movie";
        errMsg(this.store, this.fromMsg, msg);
      }
    );
  }
}
