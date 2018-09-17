import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MatchesState } from "./matches.reducer";
import { MatchedUser } from "../models/matched-user.model";

export const selectMatchesState = createFeatureSelector<MatchesState>(
  "matches"
);

export const selectMatches = createSelector(
  selectMatchesState,
  matchesState => <MatchedUser[]>matchesState.matches
);
