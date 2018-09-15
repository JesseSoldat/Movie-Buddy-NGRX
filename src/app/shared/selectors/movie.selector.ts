import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieState } from "../reducers/movie.reducer";

const posterUrl = "http://image.tmdb.org/t/p/w500/";

export const selectMovieState = createFeatureSelector<MovieState>("movie");

export const selectMovieList = createSelector(
  selectMovieState,
  (movieState: any) =>
    movieState.movieList.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path
        ? `${posterUrl}${movie.poster_path}`
        : "../../../assets/noFilm.png"
    }))
);
