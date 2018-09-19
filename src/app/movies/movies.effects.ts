import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";

import { MovieActionTypes, MoviesLoaded } from "./movie.actions";

@Injectable()
export class MovieEffects {
  constructor(private action$: Actions) {}

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
