import { MatchesActionTypes } from "./matches.action";
import { MatchedUser } from "../models/matched-user.model";
import { FbUser } from "../models/fb-user.model";
import { MovieDetails } from "../models/movie-details.model";

export interface MatchesState {
  userFavoriteIds: string[];
  matches: MatchedUser[];
  matchedUser: FbUser;
  matchedMovie: MovieDetails;
}

export const initialMatchesState = {
  userFavoriteIds: null, // array of ids of the current user's favorite movies
  matches: null, // All users and data about how many movies they match and unmatched with the current user
  matchedUser: null, // Single user and all of their movies
  matchedMovie: null // A single movie of one user
};

export const matchesReducer = (state = initialMatchesState, action) => {
  const { type, payload } = action;
  switch (type) {
    // The current user's favorite movie ids
    case MatchesActionTypes.GetUserFavoriteIdsLoadedMS:
      return { ...state, userFavoriteIds: payload.userFavoriteIds };

    // All users and data about the # of matches / un-matches
    case MatchesActionTypes.GetMatchedUsersLoadedMS:
      return { ...state, matches: payload.matches, match: null };

    // A single matched user and all their movies
    case MatchesActionTypes.GetMatchedUserLoadedMS:
      return { ...state, matchedUser: payload.matchedUser };

    // Details view of a Single User Matched Movie
    case MatchesActionTypes.GetMatchedUserDetailsLoadedMS:
      return { ...state, matchedMovie: payload.matchedMovie };

    case MatchesActionTypes.MatchDetailsClearedMDP:
      return { ...state, matchedMovie: null };

    default:
      return { ...state };
  }
};
