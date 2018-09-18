import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.reducer";

const titleEnum = {
  green: "Success: ",
  blue: "Info: ",
  red: "Error: "
};

const colorEnum = {
  green: "alert-success",
  blue: "alert-info",
  red: "alert-danger"
};

export const selectSharedState = createFeatureSelector<SharedState>("shared");

// OVERLAY
export const selectShowOverlay = createSelector(
  selectSharedState,
  sharedState => sharedState.showOverlay
);

// MESSAGE
const formatMsg = msg => {
  if (!msg) {
    return null;
  }

  return {
    title: msg.title ? msg.title : titleEnum[msg.color],
    msg: msg.msg,
    color: colorEnum[msg.color]
  };
};

export const selectMsg = createSelector(selectSharedState, sharedState =>
  formatMsg(sharedState.msg)
);
