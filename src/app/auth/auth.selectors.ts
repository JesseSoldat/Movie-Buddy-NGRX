import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  authState => authState.loggedIn
);

export const selectIsLoggedOut = createSelector(
  selectIsLoggedIn,
  loggedIn => !loggedIn
);

export const selectUser = createSelector(
  selectAuthState,
  authState => authState.user
);

export const selectUserUid = createSelector(
  selectUser,
  user => (user ? user.uid : null)
);

export const selectUsername = createSelector(
  selectUser,
  user => (user ? user.username : null)
);
