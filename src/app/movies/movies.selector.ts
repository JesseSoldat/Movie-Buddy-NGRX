import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieState } from "./movie.reducer";
import { Movie } from "../models/movie.model";
import { MovieDetails } from "../models/movie-details.model";

const posterUrl = "http://image.tmdb.org/t/p/w500/";

export const selectMovieState = createFeatureSelector<MovieState>("movie");

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

export const selectMovieDetails = createSelector(
  selectMovieState,
  (movieState: MovieState) => {
    const { movieDetails } = movieState;
    console.log(movieDetails);

    return movieDetails
      ? {
          id: movieDetails.id,
          title: movieDetails.title,
          genres: movieDetails.genres.length ? movieDetails.genres : [],
          budget: movieDetails.budget || "The movie budget is not available.",
          revenue:
            movieDetails.revenue || "The movie revenue is not available.",
          homepage:
            movieDetails.homepage || "The movie homepage is not available.",
          overview:
            movieDetails.overview || "The movie overview is not available.",
          poster_path: movieDetails.poster_path
            ? `${posterUrl}${movieDetails.poster_path}`
            : "../../../assets/noFilm.png",
          release_date:
            movieDetails.release_date ||
            "The movie release date is not available.",
          runtime: movieDetails.runtime || "The movie length is not available.",
          voter_average:
            movieDetails.voter_average || "The movie score is not available."
        }
      : null;
  }
);
