import { Action } from "@ngrx/store";

import { Movie } from "../models/movie.model";
import { MovieDetails } from "../models/movie-details.model";

export enum MovieActionTypes {
  MoviesRequested = "[Movie Search Page] MoviesRequested",
  MoviesLoaded = "[Movies Service] MoviesLoaded",
  GetMovieDetails = "GetMovieDetails"
}

export class MoviesRequested implements Action {
  readonly type = MovieActionTypes.MoviesRequested;
}

export class MoviesLoaded implements Action {
  readonly type = MovieActionTypes.MoviesLoaded;

  constructor(public payload: { movieList: Movie[] }) {}
}

export class GetMovieDetails implements Action {
  readonly type = MovieActionTypes.GetMovieDetails;

  constructor(public payload: { movieDetails: MovieDetails }) {}
}

export type MovieActions = MoviesRequested | MoviesLoaded | GetMovieDetails;
