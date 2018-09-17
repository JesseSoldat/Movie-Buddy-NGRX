import { Action } from "@ngrx/store";

import { MatchedUser } from "../models/matched-user.model";
import { FbUser } from "../models/fb-user.model";

export enum MatchesActionTypes {
  GetUserFavoriteIds = "GetUserFavoriteIds",
  GetMatches = "GetMatches",
  GetMatch = "GetMatch"
}

export class GetUserFavoriteIds implements Action {
  readonly type = MatchesActionTypes.GetUserFavoriteIds;

  constructor(public payload: { userFavoriteIds: string[] }) {}
}

export class GetMatches implements Action {
  readonly type = MatchesActionTypes.GetMatches;

  constructor(public payload: { matches: MatchedUser[] }) {}
}

export class GetMatch implements Action {
  readonly type = MatchesActionTypes.GetMatch;

  constructor(public payload: { match: FbUser }) {}
}

export type MatchesActions = GetMatches | GetMatch;
