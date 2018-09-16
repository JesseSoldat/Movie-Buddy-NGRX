import { Action } from "@ngrx/store";

import { Movie } from "../models/movie.model";
import { MovieDetails } from "../models/movie-details.model";

export enum MovieActionTypes {
  GetMovieList = "GetMovieList",
  GetMovieDetails = "GetMovieDetails",
  GetFavorites = "GetFavorites"
}

export class GetMovieList implements Action {
  readonly type = MovieActionTypes.GetMovieList;

  constructor(public payload: { movieList: Movie[] }) {}
}

export class GetMovieDetails implements Action {
  readonly type = MovieActionTypes.GetMovieDetails;

  constructor(public payload: { movieDetails: MovieDetails }) {}
}

export class GetFavorites implements Action {
  readonly type = MovieActionTypes.GetFavorites;

  constructor(public payload: { favorites: MovieDetails[] }) {}
}

export type MovieActions = GetMovieList | GetMovieDetails | GetFavorites;
