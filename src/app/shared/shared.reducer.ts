import { SharedActionTypes } from "./shared.actions";

import { Msg } from "../models/msg.model";

export interface SharedState {
  showOverlay: boolean;
  showSpinner: boolean;
  msg: Msg;
}

export const initialSharedState: SharedState = {
  showOverlay: false,
  showSpinner: false,
  msg: { msg: "", color: "" }
};

export const sharedReducer = (state = initialSharedState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SharedActionTypes.ShowOverlay:
      return { ...state, showOverlay: payload.showOverlay };

    case SharedActionTypes.ShowSpinner:
      return { ...state, showSpinner: payload.showSpinner };

    case SharedActionTypes.ShowMsg:
      return {
        ...state,
        showSpinner: false,
        showOverlay: false,
        msg: payload.msg
      };

    default:
      return { ...state };
  }
};
