import { MovieActionTypes } from "./movie.actions";

import { Movie } from "../models/movie.model";
import { MovieDetails } from "../models/movie-details.model";

export interface MovieState {
  movieList: Movie[];
  movieDetails: MovieDetails;
  favorites: MovieDetails[];
}

export const initialMovieState = {
  movieList: [],
  movieDetails: null,
  favorites: []
};

export const movieReducer = (state = initialMovieState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MovieActionTypes.GetMovieList:
      return { ...state, movieList: payload, movieDetails: null };

    case MovieActionTypes.GetMovieDetails:
      return { ...state, movieDetails: payload.movieDetails };

    case MovieActionTypes.GetFavorites:
      return { ...state, favorites: payload.favorites };

    case MovieActionTypes.DeleteFromFavorites:
      let favoritesCopy = [...state.favorites];
      favoritesCopy.filter(obj => obj.id === payload.movieId);

      return { ...state, favorites: favoritesCopy };

    default:
      return { ...state };
  }
};
