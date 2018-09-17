import { Action } from "@ngrx/store";

import { MatchedUser } from "../models/matched-user.model";

export enum MatchesActionTypes {
  GetMatches = "GetMatches"
}

export class GetMatches implements Action {
  readonly type = MatchesActionTypes.GetMatches;

  constructor(public payload: { matches: MatchedUser[] }) {}
}

export type MatchesActions = GetMatches;
