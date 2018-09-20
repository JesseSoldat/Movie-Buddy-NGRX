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
  (currentUserIds, matchedUser) => {
    // console.log("MyListIds:", currentUserIds);

    if (currentUserIds && matchedUser) {
      const favorites = Object.values(matchedUser.favorites);
      const newMovies = favorites.filter(
        favorite => !currentUserIds.find(id => id === favorite.id)
      );
      // console.log("ALL of Matched User Favorites:", favorites);
      // console.log("FILTERED:", newMovies);
      return {
        favorites: newMovies,
        key: matchedUser.key,
        user: matchedUser.user
      };
    } else {
      return null;
    }
  }
);
