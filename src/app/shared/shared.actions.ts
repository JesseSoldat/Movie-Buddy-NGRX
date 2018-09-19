import { Action } from "@ngrx/store";

import { Msg } from "../models/msg.model";

export enum SharedActionTypes {
  // Overlay
  ShowOverlayAS = "[Auth Service] ShowOverlay",
  ShowOverlayFS = "[Favorites Service] ShowOverlay",
  ShowOverlayMS = "[Movie Service] ShowOverlay",
  ShowOverlayMSP = "[Movie Search Page] ShowOverlay Add Favorite",
  // MSG
  ShowMsgAS = "[Auth Service] ShowMsg",
  ShowMsgFS = "[Favorites Service] ShowMsg",
  ShowMsgMS = "[Movie Service] ShowMsg",
  ShowMsgMC = "[Message Component] ShowMsg",
  ShowMsgMDP = "[Movie Details Page] ShowMsg",
  ShowMsgMSP = "[ Movie Search Page ] Show Msg"
}

export class ShowOverlay implements Action {
  type: string;

  constructor(public payload: { showOverlay: boolean; from: string }) {
    this.type = SharedActionTypes[payload.from];
  }
}

export class ShowMsg implements Action {
  type: string;

  constructor(public payload: { msg: Msg; from: string }) {
    this.type = SharedActionTypes[payload.from];
  }
}

export type SharedActions = ShowOverlay | ShowMsg;
