import { MovieActionTypes } from "./movie.actions";
import { AuthActionTypes } from "../auth/auth.actions";

import { Movie } from "../models/movie.model";
import { MovieDetails } from "../models/movie-details.model";

export interface MovieState {
  movieList: Movie[];
  movieDetails: MovieDetails;
}

export const initialMovieState = {
  movieList: null,
  movieDetails: null
};

export function movieReducer(state = initialMovieState, action) {
  const { type, payload } = action;
  switch (type) {
    case MovieActionTypes.MoviesLoadedMS:
    case MovieActionTypes.MoviesLoadedFromLocalStorageMSP:
      return { ...state, movieList: payload.movieList, movieDetails: null };

    case MovieActionTypes.MovieDetailsLoadedMS:
      return { ...state, movieDetails: payload.movieDetails };

    case MovieActionTypes.MovieDetailsClearedMDP:
    case MovieActionTypes.MovieDetailsClearedMSP:
      return { ...state, movieDetails: null };

    case AuthActionTypes.LogoutAction:
      return {
        state: initialMovieState
      };

    default:
      return { ...state };
  }
}
