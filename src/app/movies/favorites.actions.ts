import { Action } from "@ngrx/store";

import { MovieDetails } from "../models/movie-details.model";

export enum FavoritesActionTypes {
  // Requested
  FavoritesRequestedMSP = "[Movie Search Page] FavoritesRequested",
  FavoritesRequestedFP = "[Favorites Page] FavoritesRequested",
  // Loaded
  FavoritesLoadedFS = "[Favorites Service] FavoritesLoaded",
  FavoritesLoadedFromLocalStorageMSP = "[Movies Search Page - Local Storage] FavoritesLoaded",
  FavoritesLoadedFromLocalStorageFP = "[Favorites Page - Local Storage] FavoritesLoaded",
  // Updates
  FavoritesDeletedFS = "[Favorites Service] FavoritesDeleted",
  FavoritesAddedFS = "[Favorites Service] FavoritesAdded",
  FavoriteDetailsClearedFDP = "[Favorite Details Page] FavoriteDetailsCleared"
}

export class FavoritesRequested implements Action {
  type: string;

  constructor(public payload: { from: string }) {
    this.type = FavoritesActionTypes[payload.from];
  }
}

export class FavoritesLoaded implements Action {
  type: string;

  constructor(public payload: { favoritesList: MovieDetails[]; from: string }) {
    this.type = FavoritesActionTypes[payload.from];
  }
}

export class FavoritesDeleted implements Action {
  type: string;

  constructor(public payload: { movieId: number; from: string }) {
    this.type = FavoritesActionTypes[payload.from];
  }
}

export class FavoritesAdded implements Action {
  type: string;

  constructor(public payload: { favoritesList: MovieDetails[]; from: string }) {
    this.type = FavoritesActionTypes[payload.from];
  }
}

export class FavoriteDetailsCleared implements Action {
  type: string;

  constructor(public payload: { from: string }) {
    this.type = FavoritesActionTypes[payload.from];
  }
}

export type FavoritesActions =
  | FavoritesRequested
  | FavoritesLoaded
  | FavoritesDeleted
  | FavoriteDetailsCleared;
