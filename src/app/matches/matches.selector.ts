import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MatchesState } from "./matches.reducer";
import { MatchedUser } from "../models/matched-user.model";
import { FbUser } from "../models/fb-user.model";

export const selectMatchesState = createFeatureSelector<MatchesState>(
  "matches"
);

// Current user favorite ids
export const selectUserFavoriteIds = createSelector(
  selectMatchesState,
  matchesState => <string[]>matchesState.userFavoriteIds
);

// All matched users
export const selectMatches = createSelector(
  selectMatchesState,
  matchesState => <MatchedUser[]>matchesState.matches
);

// Single matched user
export const selectMatch = createSelector(
  selectMatchesState,
  matchesState => <FbUser>matchesState.match
);

// Single Matched user with Non-Matched Movies
export const selectNonMatchedUserMovies = createSelector(
  selectUserFavoriteIds,
  selectMatch,
  (ids, user) => {
    // console.log(ids);
    // console.log(user);
    if (ids && user) {
      const favorites = Object.values(user.favorites);
      const newMovies = favorites.filter(
        favorite => !ids.find(id => id === favorite.id)
      );
      console.log("ALL:", favorites);
      console.log("FILTERED:", newMovies);
      return {
        favorites: favorites,
        key: user.key,
        user: user.user
      };
    }
    return null;
  }
);
