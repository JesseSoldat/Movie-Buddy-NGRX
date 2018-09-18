import { Action } from "@ngrx/store";

import { MovieDetails } from "../models/movie-details.model";

export enum FavoritesActionTypes {
  FavoritesRequestedSP = "[Search Page] FavoritesRequested",
  FavoritesRequestedFP = "[Favorites Page] FavoritesRequested",
  FavoritesLoaded = "[Favorites Service] FavoritesLoaded",
  DeleteFromFavorites = "[Favorites Service] DeleteFromFavorites"
}

export class FavoritesRequested implements Action {
  type: string;

  constructor(public payload: string) {
    this.type = FavoritesActionTypes[payload];
  }
}

export class FavoritesLoaded implements Action {
  readonly type = FavoritesActionTypes.FavoritesLoaded;

  constructor(public payload: { favoritesList: MovieDetails[] }) {}
}

export class DeleteFromFavorites implements Action {
  readonly type = FavoritesActionTypes.DeleteFromFavorites;

  constructor(public payload: { movieId: string | number }) {}
}

export type FavoritesActions =
  | FavoritesRequested
  | FavoritesLoaded
  | DeleteFromFavorites;
