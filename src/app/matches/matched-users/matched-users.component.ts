import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
// Models
import { MatchedUser } from "../../models/matched-user.model";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectMatches } from "../matches.selector";
import {
  GetMatchedUsersRequest,
  GetUserFavoriteIdsRequest
} from "../matches.action";
// Services
import { MatchesService } from "../../core/services/matches.service";

@Component({
  selector: "app-matched-users",
  templateUrl: "./matched-users.component.html",
  styleUrls: ["./matched-users.component.css"]
})
export class MatchedUsersComponent implements OnInit {
  matches$: Observable<MatchedUser[]>;
  // From Action Types
  getMatchedUsersRequestMUP = "GetMatchedUsersRequestMUP";
  getUserFavoriteIdsRequestMUP = "GetUserFavoriteIdsRequestMUP";

  constructor(
    private store: Store<AppState>,
    private matchesService: MatchesService
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new GetMatchedUsersRequest({ from: this.getMatchedUsersRequestMUP })
    );
    this.store.dispatch(
      new GetUserFavoriteIdsRequest({ from: this.getUserFavoriteIdsRequestMUP })
    );
    this.matchesService.getOtherUsersLists();
    this.matches$ = this.store.pipe(select(selectMatches));
  }
}
