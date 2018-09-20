import { Action } from "@ngrx/store";

import { MatchedUser } from "../models/matched-user.model";
import { FbUser } from "../models/fb-user.model";

export enum MatchesActionTypes {
  // Current Users Favorite Ids to compare to other users
  GetUserFavoriteIdsMS = "[Matches Service] GetUserFavoriteIds",
  // Get All Matched Users
  GetMatchedUsersRequestMUP = "[Matched Users Page] GetMatchedUsersRequest",
  GetMatchedUsersLoadedMS = "[Matches Service] GetMatchedUsersLoaded",
  // Get A Single Matched User's List of Unmatched Movies
  GetMatchedUserRequestMP = "[Matches Page] GetMatchedUserRequest",
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
export class GetUserFavoriteIds implements Action {
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
  | GetUserFavoriteIds
  | GetMatchedUserRequest
  | GetMatchedUserLoaded;
