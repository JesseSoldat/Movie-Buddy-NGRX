export interface MatchedUser {
  name: string;
  uid: string;
  isMatch: string[];
  noMatch: string[];
  matched: number;
  unmatched: number;
}
