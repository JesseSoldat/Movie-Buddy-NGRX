import { Action } from "@ngrx/store";

import { MatchedUser } from "../models/matched-user.model";
import { FbUser } from "../models/fb-user.model";

export enum MatchesActionTypes {
  // Current Users Favorite Ids to compare to other users
  GetUserFavoriteIdsRequestMUFP = "[Matched User Favorites Page] GetUserFavoriteIdsRequest",
  GetUserFavoriteIdsRequestMUP = "[Matched User Page] GetUserFavoriteIdsRequest",
  GetUserFavoriteIdsLoadedMS = "[Matches Service] GetUserFavoriteIdsLoaded",

  // Get All Matched Users
  GetMatchedUsersRequestMUP = "[Matched User Page] GetMatchedUsersRequest",
  GetMatchedUsersLoadedMS = "[Matches Service] GetMatchedUsersLoaded",

  // Get A Single Matched User's List of Unmatched Movies
  GetMatchedUserRequestMUFP = "[Matched User Favorites Page] GetMatchedUserRequest",
  GetMatchedUserLoadedMS = "[Matches Service] GetMatchedUserLoaded"
}

// Get All Matched Users
export class GetMatchedUsersRequest implements Action {
  type: string;

  constructor(public payload: { from: string }) {
    this.type = MatchesActionTypes[payload.from];
  }
}

export class GetMatchedUsersLoaded implements Action {
  type: string;

  constructor(public payload: { matches: MatchedUser[]; from: string }) {
    this.type = MatchesActionTypes[payload.from];
  }
}

// Current Users Favorite Ids to compare to other users
export class GetUserFavoriteIdsRequest implements Action {
  type: string;

  constructor(public payload: { from: string }) {
    this.type = MatchesActionTypes[payload.from];
  }
}

export class GetUserFavoriteIdsLoaded implements Action {
  type: string;

  constructor(public payload: { userFavoriteIds: string[]; from: string }) {
    this.type = MatchesActionTypes[payload.from];
  }
}

// Get A Single Matched User's List of Unmatched Movies
export class GetMatchedUserRequest implements Action {
  type: string;

  constructor(public payload: { from: string }) {
    this.type = MatchesActionTypes[payload.from];
  }
}

export class GetMatchedUserLoaded implements Action {
  type: string;

  constructor(public payload: { match: FbUser; from: string }) {
    this.type = MatchesActionTypes[payload.from];
  }
}

export type MatchesActions =
  | GetMatchedUsersRequest
  | GetMatchedUsersLoaded
  | GetUserFavoriteIdsRequest
  | GetUserFavoriteIdsLoaded
  | GetMatchedUserRequest
  | GetMatchedUserLoaded;
