import { FavoritesActionTypes } from "./favorites.actions";
import { AuthActionTypes } from "../auth/auth.actions";

import { MovieDetails } from "../models/movie-details.model";

export interface FavoritesState {
  favoritesList: MovieDetails[];
  favoriteDetails: MovieDetails;
}

export const initialFavoritesState = {
  favoritesList: null,
  favoriteDetails: null
};

export function favoritesReducer(state = initialFavoritesState, action) {
  const { type, payload } = action;
  switch (type) {
    case FavoritesActionTypes.FavoritesLoadedFS:
    case FavoritesActionTypes.FavoritesLoadedFromLocalStorageMSP:
    case FavoritesActionTypes.FavoritesLoadedFromLocalStorageFP:
      return {
        ...state,
        favoritesList: payload.favoritesList,
        favoriteDetails: null
      };

    case FavoritesActionTypes.FavoritesAddedFS:
      return { ...state, favoritesList: payload.favoritesList };

    case FavoritesActionTypes.FavoritesDeletedFS:
      const favoritesCopy = [...state.favoritesList];
      const filteredCopy = favoritesCopy.filter(
        obj => obj.id !== payload.movieId
      );

      try {
        localStorage.setItem("favorites", JSON.stringify(filteredCopy));
      } catch (err) {
        console.log("Could not save Favorites to local storage");
      }

      return { ...state, favoritesList: filteredCopy };

    case FavoritesActionTypes.FavoriteDetailsClearedFDP:
      return { ...state, favoriteDetails: null };

    case AuthActionTypes.LogoutAction:
      return {
        state: initialFavoritesState
      };

    default:
      return { ...state };
  }
}
