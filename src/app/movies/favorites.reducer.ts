import { FavoritesActionTypes } from "./favorites.actions";

import { MovieDetails } from "../models/movie-details.model";

export interface FavoritesState {
  favoritesList: MovieDetails[];
  favoriteDetails: MovieDetails;
}

export const initialFavoritesState = {
  favoritesList: null,
  favoriteDetails: null
};

export const favoritesReducer = (state = initialFavoritesState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FavoritesActionTypes.FavoritesLoadedFS:
    case FavoritesActionTypes.FavoritesLoadedFromLocalStorageSP:
      return {
        ...state,
        favoritesList: payload.favoritesList,
        favoriteDetails: null
      };

    case FavoritesActionTypes.FavoritesAdded:
      return { ...state, favoritesList: payload.favoritesList };

    case FavoritesActionTypes.FavoritesDeleted:
      let favoritesCopy = [...state.favoritesList];
      favoritesCopy.filter(obj => obj.id === payload.movieId);

      try {
        localStorage.setItem("favorites", JSON.stringify(favoritesCopy));
      } catch (err) {
        console.log("Could not save Favorites to local storage");
      }

      return { ...state, favoritesList: favoritesCopy };

    case FavoritesActionTypes.FavoriteDetailsCleared:
      return { ...state, favoriteDetails: null };

    default:
      return { ...state };
  }
};
