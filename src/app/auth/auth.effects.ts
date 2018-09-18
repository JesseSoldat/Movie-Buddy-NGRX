import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { tap } from "rxjs/operators";
import { of, defer } from "rxjs";
// Ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthActionTypes, Register, Login, Logout } from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private router: Router, private store: Store<AppState>) {}

  @Effect({ dispatch: false })
  register$ = this.action$.pipe(
    ofType<Register>(AuthActionTypes.RegisterAction),
    tap(action => {
      try {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        this.router.navigateByUrl("/movies");
      } catch (err) {
        this.router.navigateByUrl("/movies");
        console.log("Could not save user to local storage");
      }
    })
  );

  onAuthNav() {
    switch (window.location.pathname) {
      case "/login":
      case "/register":
      case "/welcome":
      case "/":
        this.router.navigateByUrl("/movies");
        break;
      default:
        break;
    }
  }


  @Effect({ dispatch: false })
  login$ = this.action$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
      try {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        this.onAuthNav();
      } catch (err) {
        this.onAuthNav();
        console.log("Could not save user to local storage");
      }
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.action$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(action => {
      try {
        localStorage.removeItem("user");
        localStorage.removeItem("movies");
        localStorage.removeItem("favorites")
        this.router.navigateByUrl("/login");
      } catch (err) {
        this.router.navigateByUrl("/login");
        console.log("Could not remove user from local storage");
      }
    })
  );



  @Effect()
  init$ = defer(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        return of(
          new Login({ user: JSON.parse(user) })
        );
      }
      return of(new Logout());
    } catch (err) {
      return of(new Logout());
    }
  });

