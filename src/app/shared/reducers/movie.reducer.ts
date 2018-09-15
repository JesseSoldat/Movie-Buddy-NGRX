import { MovieActionTypes } from "../actions/movie.actions";

import { Movie } from "../../models/movie.model";

export interface MovieState {
  movieList: Movie[];
  movieDetails: Movie;
}

export const initialMovieState = {
  movieList: [],
  movieDetails: null
};

export const movieReducer = (state = initialMovieState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MovieActionTypes.GetMovieList:
      return { ...state, movieList: payload, movieDetails: null };

    case MovieActionTypes.GetMovieDetails:
      return { ...state, movieDetails: payload };

    default:
      return { ...state };
  }
};
