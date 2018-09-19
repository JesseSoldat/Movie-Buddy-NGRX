import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  FavoritesLoaded,
  FavoritesAdded,
  FavoritesActionTypes
} from "./favorites.actions";

@Injectable()
export class FavoritesEffects {
  constructor(private action$: Actions) {}

  @Effect({ dispatch: false })
  favoritesLoaded$ = this.action$.pipe(
    ofType<FavoritesLoaded>(FavoritesActionTypes.FavoritesLoadedFS),
    tap(action => {
      const favorites = action.payload.favoritesList;
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (err) {
        console.log("Could not save Favorites to local storage");
      }
    })
  );

  @Effect({ dispatch: false })
  favoritesAdded$ = this.action$.pipe(
    ofType<FavoritesAdded>(FavoritesActionTypes.FavoritesAdded),
    tap(action => {
      const favorites = action.payload.favoritesList;
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (err) {
        console.log("Could not save Favorites to local storage");
      }
    })
  );
}
