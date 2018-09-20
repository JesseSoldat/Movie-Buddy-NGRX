import { Action } from "@ngrx/store";

import { Movie } from "../models/movie.model";
import { MovieDetails } from "../models/movie-details.model";

export enum MovieActionTypes {
  // Movie List
  MoviesRequestedMSP = "[Movie Search Page] MoviesRequested",
  MoviesLoadedMS = "[Movies Service] MoviesLoaded",
  MoviesLoadedFromLocalStorageMSP = "[Movies Search Page - Local Storage] MoviesLoaded",
  // Details
  MovieDetailsRequestedMSP = "[Movie Search Page] MovieDetailsRequested",
  MovieDetailsRequestedMDP = "[Movie Details Page] MovieDetailsRequested",
  MovieDetailsLoadedMS = "[Movies Service] MovieDetailsLoaded",
  movieDetailsClearedMSP = "[Movie Search Page] movieDetailsClearedMSP",
  MovieDetailsClearedMDP = "[Movie Details Page] MovieDetailsCleared"
}
// Movie List
export class MoviesRequested implements Action {
  type: string;

  constructor(public payload: { from: string }) {
    this.type = MovieActionTypes[payload.from];
  }
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

  constructor(public payload: { from: string }) {
    this.type = MovieActionTypes[payload.from];
  }
}

export class MovieDetailsLoaded implements Action {
  type: string;

  constructor(public payload: { movieDetails: MovieDetails; from: string }) {
    this.type = MovieActionTypes[payload.from];
  }
}

export class MovieDetailsCleared implements Action {
  type: string;

  constructor(public payload: { from: string }) {
    this.type = MovieActionTypes[payload.from];
  }
}

export type MovieActions =
  | MoviesRequested
  | MoviesLoaded
  | MovieDetailsRequested
  | MovieDetailsLoaded
  | MovieDetailsCleared;
