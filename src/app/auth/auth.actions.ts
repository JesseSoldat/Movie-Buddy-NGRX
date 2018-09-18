import { Action } from "@ngrx/store";
import { User } from "../models/user.model";

export enum AuthActionTypes {
  LoginAction = "[Login] Action",
  RegisterAction = "[Register] Action",
  LogoutAction = "[Navbar Logout] Action"
}

export class Register implements Action {
  readonly type = AuthActionTypes.RegisterAction;

  constructor(public payload: { user: User }) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: { user: User }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions = Register | Login | Logout;
