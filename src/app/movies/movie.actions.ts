import { Action } from "@ngrx/store";

import { Movie } from "../models/movie.model";
import { MovieDetails } from "../models/movie-details.model";

export enum MovieActionTypes {
  MoviesRequested = "[Movie Search Page] MoviesRequested",
  MoviesLoadedMS = "[Movies Service] MoviesLoaded",
  MoviesLoadedFromLocalStorageSP = "[Movies Search Page - Local Storage ] MoviesLoaded",
  MovieDetailsRequestedSP = "[Movie Search Page] MovieDetailsRequested",
  MovieDetailsLoaded = "[Movies Service] MovieDetailsLoaded",
  MovieDetailsCleared = "[Movie Details Page] MovieDetailsCleared"
}

// Movie List
export class MoviesRequested implements Action {
  readonly type = MovieActionTypes.MoviesRequested;
}

export class MoviesLoaded implements Action {
  type: string;

  constructor(public payload: { movieList: Movie[]; from: string }) {
    this.type = MovieActionTypes[payload.from];
  }
}

// Movie Details
export class MovieDetailsRequested implements Action {
  type: string;

  constructor(public payload: string) {
    this.type = MovieActionTypes[payload];
  }
}

export class MovieDetailsLoaded implements Action {
  readonly type = MovieActionTypes.MovieDetailsLoaded;

  constructor(public payload: { movieDetails: MovieDetails }) {}
}

export class MovieDetailsCleared implements Action {
  readonly type = MovieActionTypes.MovieDetailsCleared;
}

export type MovieActions =
  | MoviesRequested
  | MoviesLoaded
  | MovieDetailsRequested
  | MovieDetailsLoaded
  | MovieDetailsCleared;
