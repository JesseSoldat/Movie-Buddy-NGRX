import { MatchesActionTypes } from "./matches.action";
import { MatchedUser } from "../models/matched-user.model";

export interface MatchesState {
  matches: MatchedUser[];
}

export const initialMatchesState = {
  matches: []
};

export const matchesReducer = (state = initialMatchesState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MatchesActionTypes.GetMatches:
      return { ...state };

    default:
      return { ...state };
  }
};
