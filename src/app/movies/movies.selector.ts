import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieState } from "./movie.reducer";
import { Movie } from "../models/movie.model";
import { MovieDetails } from "../models/movie-details.model";

const posterUrl = "http://image.tmdb.org/t/p/w500/";

export const selectMovieState = createFeatureSelector<MovieState>("movie");

// Movie List
export const selectMovieList = createSelector(
  selectMovieState,
  (movieState: MovieState) =>
    movieState.movieList.map(
      movie =>
        <Movie>{
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path
            ? `${posterUrl}${movie.poster_path}`
            : "../../../assets/noFilm.png"
        }
    )
);

// Favorites
export const selectFavorites = createSelector(
  selectMovieState,
  (movieState: MovieState) => <MovieDetails[]>movieState.favorites
);

// Select Filtered Movie Search List
export const selectFilteredMovieList = createSelector(
  selectFavorites,
  selectMovieList,
  (favorites, movies) => {
    if (movies.length && favorites.length) {
      return movies.filter(
        movie => !favorites.find(favorite => movie.id === favorite.id)
      );
    }
    return movies;
  }
);

// Movie Details
export const createMovieDetails = (obj: MovieDetails): MovieDetails => ({
  id: obj.id,
  title: obj.title,
  genres: obj.genres.length
    ? obj.genres
    : "The movie genres are not available.",
  budget: obj.budget || "The movie budget is not available.",
  revenue: obj.revenue || "The movie revenue is not available.",
  homepage: obj.homepage || "The movie homepage is not available.",
  overview: obj.overview || "The movie overview is not available.",
  poster_path: obj.poster_path
    ? `${posterUrl}${obj.poster_path}`
    : "../../../assets/noFilm.png",
  release_date: obj.release_date || "The movie release date is not available.",
  runtime: obj.runtime || "The movie length is not available.",
  voter_average: obj.voter_average || "The movie score is not available."
});

export const selectMovieDetails = createSelector(
  selectMovieState,
  (movieState: MovieState) => {
    const { movieDetails } = movieState;
    return movieDetails ? createMovieDetails(movieDetails) : null;
  }
);
