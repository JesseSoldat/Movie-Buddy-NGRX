import { User } from "../models/user.model";
import { AuthActions, AuthActionTypes } from "./auth.actions";

export interface AuthState {
  loggedIn: boolean;
  user: User;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined
};

export const authReducer = (state = initialAuthState, action: AuthActions) => {
  switch (action.type) {
    case AuthActionTypes.RegisterAction:
      console.log("Register", action.payload.user);
      return {
        loggedIn: true,
        user: action.payload.user
      };

    case AuthActionTypes.LoginAction:
      return {
        loggedIn: true,
        user: action.payload.user
      };

    default:
      return { ...state };
  }
};
