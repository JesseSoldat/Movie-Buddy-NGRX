import { Action } from "@ngrx/store";

import { Movie } from "../../models/movie.model";

export enum MovieActionTypes {
  GetMovieList = "GetMovieList",
  GetMovieDetails = "GetMovieDetails"
}

export class GetMovieList implements Action {
  readonly type = MovieActionTypes.GetMovieList;

  constructor(public payload: { movieList: Movie[] }) {}
}

export class GetMovieDetails implements Action {
  readonly type = MovieActionTypes.GetMovieDetails;

  constructor(public payload: { movieDetails: Movie }) {}
}

export type MovieActions = GetMovieList | GetMovieDetails;
