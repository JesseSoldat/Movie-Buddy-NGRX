import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// Rxjs
import { first } from "rxjs/operators";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { MatchesService } from "../../core/services/matches.service";
import { selectNonMatchedUserMovies } from "../matches.selector";

@Component({
  selector: "app-matched-user-favorite-details",
  templateUrl: "./matched-user-favorite-details.component.html",
  styleUrls: ["./matched-user-favorite-details.component.css"]
})
export class MatchedUserFavoriteDetailsComponent implements OnInit {
  matches;

  constructor(
    private store: Store<AppState>,
    private matchesService: MatchesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(param => {
      this.matchesService.getOtherUserMovies(param.id);
    });
    this.store
      .pipe(
        select(selectNonMatchedUserMovies),
        first()
      )
      .subscribe(matches => {
        this.matches = matches;
        console.log(matches);
      });
  }
}
