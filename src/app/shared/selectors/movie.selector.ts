import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieState } from "../reducers/movie.reducer";

export const selectMovieState = createFeatureSelector<MovieState>("movie");

export const selectMovieList = createSelector(
  selectMovieState,
  movieState => movieState.movieList
);
