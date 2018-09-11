import { Action } from "@ngrx/store";
import { User } from "../models/user.model";

export enum AuthActionTypes {
  LoginAction = "[Login] Action",
  RegisterAction = "[Register] Action",
  LogoutAcion = "[Logout] Action"
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: { user: User }) {}
}

export type AuthActions = Login;
