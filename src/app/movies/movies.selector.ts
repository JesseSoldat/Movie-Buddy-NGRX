import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieState } from "./movie.reducer";
import { FavoritesState } from "./favorites.reducer";
import { Movie } from "../models/movie.model";
import { MovieDetails } from "../models/movie-details.model";

const posterUrl = "https://image.tmdb.org/t/p/w500/";

export const selectMovieState = createFeatureSelector<MovieState>("movie");

export const selectFavoritesState = createFeatureSelector<FavoritesState>(
  "favorites"
);

// helpers
export const convertFromHttpToHttps = url => {
  if (!url) {
    return url;
  }
  let newUrl = url.split("http:")[1];
  newUrl = "https:" + newUrl;
  return newUrl;
};

// ----------------- Movie List ------------------
export const selectMovieList = createSelector(
  selectMovieState,
  (movieState: MovieState) => {
    if (!movieState.movieList) {
      return null;
    }

    return movieState.movieList.map(
      movie =>
        <Movie>{
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path
            ? `${posterUrl}${movie.poster_path}`
            : "../../../assets/noFilm.png"
        }
    );
  }
);

// ------------- Favorites Newest First ----------------
export const selectFavorites = createSelector(
  selectFavoritesState,
  (favoritesState: FavoritesState) => {
    if (!favoritesState.favoritesList) {
      return null;
    }
    return <MovieDetails[]>favoritesState.favoritesList.slice().reverse();
  }
);
// -------------- Favorite Details -------------------

export const selectFavoriteDetailsFromFavorites = (key: string) =>
  createSelector(selectFavorites, favorites => {
    if (favorites && favorites.length) {
      const favoriteDetails = favorites.find(obj => obj.key === key);
      return favoriteDetails;
    }
    return null;
  });

// ------------ convert urls from http to https ----------------
// export const selectConvertHttpToHttps = createSelector(
//   selectMovieList,
//   movieList =>
//     movieList
//       ? movieList.map(obj => {
//           const newObj = { ...obj };
//           const newPath = convertFromHttpToHttps(obj.poster_path);
//           console.log("after", newPath);

//           newObj.poster_path = newPath;
//           return newObj;
//         })
//       : null
// );

// --------- Select Filtered Movie Search List ---------------
export const selectFilteredMovieList = createSelector(
  selectFavorites,
  selectMovieList,
  (favorites, movies) => {
    if (!movies) {
      return null;
    } else if (!favorites) {
      return movies;
    }
    return movies.filter(
      movie => !favorites.find(favorite => movie.id === favorite.id)
    );
  }
);

// ---------------------------- Movie Details ----------------------------
export const createMovieDetails = (obj: MovieDetails): MovieDetails => ({
  id: obj.id,
  title: obj.title,
  genres: obj.genres.length
    ? obj.genres
    : "The movie genres are not available.",
  budget: obj.budget || "The movie budget is not available.",
  revenue: obj.revenue || "The movie revenue is not available.",
  homepage:
    convertFromHttpToHttps(obj.homepage) ||
    "The movie homepage is not available.",
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

export const selectFavoriteDetails = createSelector(
  selectFavoritesState,
  (favoritesState: FavoritesState) => {
    const { favoriteDetails } = favoritesState;
    return favoriteDetails ? favoriteDetails : null;
  }
);
