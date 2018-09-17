import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
// Models
import { MatchedUser } from "../../models/matched-user.model";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectMatches } from "../matches.selector";
// Services
import { MatchesService } from "../../core/services/matches.service";

@Component({
  selector: "app-matched-users",
  templateUrl: "./matched-users.component.html",
  styleUrls: ["./matched-users.component.css"]
})
export class MatchedUsersComponent implements OnInit {
  uid: string;
  matches$: Observable<MatchedUser[]>;

  constructor(
    private store: Store<AppState>,
    private matchesService: MatchesService
  ) {}

  ngOnInit() {
    this.matchesService.getOtherUsersLists();
    this.matches$ = this.store.pipe(select(selectMatches));
  }
}
