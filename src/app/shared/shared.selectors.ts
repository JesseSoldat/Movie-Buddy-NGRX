import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.reducer";

const colorEnum = {
  green: "alert-success",
  blue: "alert-info",
  red: "alert-danger"
};

export const selectSharedState = createFeatureSelector<SharedState>("shared");

export const selectShowOverlay = createSelector(
  selectSharedState,
  sharedState => sharedState.showOverlay
);

export const selectShowSpinner = createSelector(
  selectSharedState,
  sharedState => sharedState.showSpinner
);

const formatMsg = msg => ({
  msg: msg.msg,
  color: colorEnum[msg.color]
});

export const selectMsg = createSelector(selectSharedState, sharedState =>
  formatMsg(sharedState.msg)
);

export const selectShowMsg = createSelector(selectMsg, msg => !!msg.msg);

export const selectHideMsg = createSelector(selectMsg, msg => !msg);
