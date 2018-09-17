import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { of } from "rxjs";
import { ShowSpinner } from "../shared/shared.actions";

import { MovieActionTypes, GetMovieDetails } from "./movie.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";

@Injectable()
export class MovieEffects {
  constructor(private action$: Actions, private store: Store<AppState>) {}
}
