import { MovieActionTypes } from "./movie.actions";

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

export const movieReducer = (state = initialMovieState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MovieActionTypes.MoviesLoaded:
      return { ...state, movieList: payload, movieDetails: null };

    case MovieActionTypes.MovieDetailsLoaded:
      return { ...state, movieDetails: payload.movieDetails };

    default:
      return { ...state };
  }
};
