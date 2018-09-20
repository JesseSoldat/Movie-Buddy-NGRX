import { MatchesActionTypes } from "./matches.action";
import { MatchedUser } from "../models/matched-user.model";
import { FbUser } from "../models/fb-user.model";

export interface MatchesState {
  userFavoriteIds: string[];
  matches: MatchedUser[];
  match: FbUser;
}

export const initialMatchesState = {
  userFavoriteIds: null,
  matches: null,
  match: null
};

export const matchesReducer = (state = initialMatchesState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MatchesActionTypes.GetMatchedUsersLoadedMS:
      return { ...state, matches: payload.matches, match: null };

    case MatchesActionTypes.GetMatchedUserLoadedMS:
      return { ...state, match: payload.match };

    case MatchesActionTypes.GetUserFavoriteIdsLoadedMS:
      return { ...state, userFavoriteIds: payload.userFavoriteIds };

    default:
      return { ...state };
  }
};
