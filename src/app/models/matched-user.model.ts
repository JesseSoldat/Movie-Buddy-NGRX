export interface MatchedUser {
  username: string;
  uid: string;
  isMatch: string[];
  noMatch: string[];
  matched: number;
  unmatched: number;
}
