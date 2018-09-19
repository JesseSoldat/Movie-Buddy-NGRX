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
    case SharedActionTypes.ShowOverlayAS:
    case SharedActionTypes.ShowOverlayFS:
    case SharedActionTypes.ShowOverlayMS:
    case SharedActionTypes.ShowOverlayMSP:
      return { ...state, showOverlay: payload.showOverlay };

    case SharedActionTypes.ShowMsgFS:
    case SharedActionTypes.ShowMsgMS:
    case SharedActionTypes.ShowMsgAS:
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
