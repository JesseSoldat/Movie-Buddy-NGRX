import { SharedActionTypes } from "./shared.actions";

import { Msg } from "../models/msg.model";

export interface SharedState {
  showOverlay: boolean;
  msg: Msg;
}

export const initialSharedState: SharedState = {
  showOverlay: false,
  msg: null
};

export const sharedReducer = (state = initialSharedState, action) => {
  const { type, payload } = action;

  switch (type) {
    // Overlay
    case SharedActionTypes.ShowOverlayAS:
    case SharedActionTypes.ShowOverlayFS:
    case SharedActionTypes.ShowOverlayMS:
    case SharedActionTypes.ShowOverlayMSP:
    case SharedActionTypes.ShowOverlayMDP:
      return { ...state, showOverlay: payload.showOverlay };

    // Msg
    case SharedActionTypes.ShowMsgAS:
    case SharedActionTypes.ShowMsgFS:
    case SharedActionTypes.ShowMsgMS:
    case SharedActionTypes.ShowMsgMC:
    case SharedActionTypes.ShowMsgMDP:
    case SharedActionTypes.ShowMsgMSP:
      return {
        ...state,
        showOverlay: false,
        msg: payload.msg
      };

    default:
      return { ...state };
  }
};
