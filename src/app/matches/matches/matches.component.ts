import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { MatchesService } from "../../core/services/matches.service";
import { selectNonMatchedUserMovies } from "../matches.selector";

@Component({
  selector: "app-matches",
  templateUrl: "./matches.component.html",
  styleUrls: ["./matches.component.css"]
})
export class MatchesComponent implements OnInit {
  uid: string;
  matches;

  constructor(
    private store: Store<AppState>,
    private matchesService: MatchesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.uid = param.id;
      this.matchesService.getOtherUserMovies(this.uid);
    });
    this.store
      .pipe(select(selectNonMatchedUserMovies))
      .subscribe(matches => (this.matches = matches));
  }
}
