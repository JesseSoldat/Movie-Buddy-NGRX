import { Action } from "@ngrx/store";

import { MovieDetails } from "../models/movie-details.model";

export enum FavoritesActionTypes {
  FavoritesRequestedSP = "[Movie Search Page] FavoritesRequested",
  FavoritesRequestedFP = "[Favorites Page] FavoritesRequested",
  FavoritesLoadedFS = "[Favorites Service] FavoritesLoaded",
  FavoritesLoadedFromLocalStorageSP = "[ Movies Search Page - Local Storage ] FavoritesLoaded",
  FavoritesLoadedFromLocalStorageFP = "[ Favorites Page - Local Storage ] FavoritesLoaded",
  FavoritesDeleted = "[Favorites Service] FavoritesDeleted",
  FavoritesAdded = "[Favorites Service] FavoritesAdded",
  FavoriteDetailsCleared = "[Favorite Details Page] FavoriteDetailsCleared"
}

export class FavoritesRequested implements Action {
  type: string;

  constructor(public payload: string) {
    this.type = FavoritesActionTypes[payload];
  }
}

export class FavoritesLoaded implements Action {
  type: string;

  constructor(public payload: { favoritesList: MovieDetails[]; from: string }) {
    this.type = FavoritesActionTypes[payload.from];
  }
}

export class FavoritesDeleted implements Action {
  readonly type = FavoritesActionTypes.FavoritesDeleted;

  constructor(public payload: { movieId: number }) {}
}

export class FavoritesAdded implements Action {
  readonly type = FavoritesActionTypes.FavoritesAdded;

  constructor(public payload: { favoritesList: MovieDetails[] }) {}
}

export class FavoriteDetailsCleared implements Action {
  readonly type = FavoritesActionTypes.FavoriteDetailsCleared;
}

export type FavoritesActions =
  | FavoritesRequested
  | FavoritesLoaded
  | FavoritesDeleted
  | FavoriteDetailsCleared;
