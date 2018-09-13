import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { of, defer } from "rxjs";

import { AuthActionTypes, Register, Login } from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions) {}

  @Effect({ dispatch: false })
  register$ = this.action$.pipe(
    ofType<Register>(AuthActionTypes.RegisterAction),
    tap(action => {
      try {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      } catch (err) {
        console.log("Could not save to local storage");
      }
    })
  );

  @Effect({ dispatch: false })
  login$ = this.action$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
      try {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      } catch (err) {
        console.log("Could not save to local storage");
      }
    })
  );

  @Effect()
  init$ = defer(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        return of(new Login({ user: JSON.parse(user) }));
      }
      console.log("No user saved");
    } catch (err) {
      console.log("Could not read from local storage");
    }
  });
}
