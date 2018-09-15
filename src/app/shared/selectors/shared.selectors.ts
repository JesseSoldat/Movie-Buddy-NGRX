import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "../reducers/shared.reducer";

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

// SPINNER
export const selectShowSpinner = createSelector(
  selectSharedState,
  sharedState => sharedState.showSpinner
);

// MESSAGE
const formatMsg = msg => ({
  title: msg.title ? msg.title : titleEnum[msg.color],
  msg: msg.msg,
  color: colorEnum[msg.color]
});

export const selectMsg = createSelector(selectSharedState, sharedState =>
  formatMsg(sharedState.msg)
);

export const selectShowMsg = createSelector(selectMsg, msg => !!msg.msg);

export const selectHideMsg = createSelector(selectMsg, msg => !msg);
