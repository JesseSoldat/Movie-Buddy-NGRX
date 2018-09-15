import { Action } from "@ngrx/store";

import { Msg } from "../../models/msg.model";

export enum SharedActionTypes {
  ShowOverlay = "ShowOverlay",
  ShowSpinner = "ShowSpinner",
  ShowMsg = "ShowMsg"
}

export class ShowOverlay implements Action {
  readonly type = SharedActionTypes.ShowOverlay;

  constructor(public payload: { showOverlay: boolean }) {}
}

export class ShowSpinner implements Action {
  readonly type = SharedActionTypes.ShowSpinner;

  constructor(public payload: { showSpinner: boolean }) {}
}

export class ShowMsg implements Action {
  readonly type = SharedActionTypes.ShowMsg;

  constructor(public payload: { msg: Msg }) {}
}

export type SharedActions = ShowOverlay | ShowSpinner | ShowMsg;
