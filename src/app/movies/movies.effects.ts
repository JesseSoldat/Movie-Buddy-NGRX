import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { of } from "rxjs";

import { MovieActionTypes, MoviesLoaded } from "./movie.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";

@Injectable()
export class MovieEffects {
  constructor(private action$: Actions, private store: Store<AppState>) {}

  @Effect({ dispatch: false })
  moviesLoaded$ = this.action$.pipe(
    ofType<MoviesLoaded>(MovieActionTypes.MoviesLoadedMS),
    tap(action => {
      const movies = action.payload.movieList;

      try {
        localStorage.setItem("movies", JSON.stringify(movies));
      } catch (err) {
        console.log("Could not save user to local storage");
      }
    })
  );
}
