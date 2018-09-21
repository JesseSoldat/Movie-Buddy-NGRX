import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// Rxjs
import { first, tap } from "rxjs/operators";
import { Observable } from "rxjs";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import {
  GetMatchedUserDetailsRequest,
  MatchDetailsCleared
} from "../matches.action";
import { selectMatchedMovie } from "../matches.selector";
// Models
import { MovieDetails } from "../../models/movie-details.model";
import { IconBtn } from "../../models/icon-btn.model";
// Services
import { FavoritesService } from "../../core/services/favorites.service";
import { MatchesService } from "../../core/services/matches.service";
// Utils
import { errMsg, showOverlay } from "../../utils/ui.action.dispatchers";

@Component({
  selector: "app-matched-user-favorite-details",
  templateUrl: "./matched-user-favorite-details.component.html",
  styleUrls: ["./matched-user-favorite-details.component.css"]
})
export class MatchedUserFavoriteDetailsComponent implements OnInit {
  movieDetails$: Observable<MovieDetails>;
  userId: string;
  movieId: number;
  // From Action Types
  fromMsg = "ShowMsgMUFP";
  fromShowOverlay = "ShowOverlayMUFP";
  getMatchedUserDetailsRequestMUFDP = "GetMatchedUserDetailsRequestMUFDP";
  matchDetailsClearedMDP = "MatchDetailsClearedMDP";

  // Card Inputs
  leftBtn: IconBtn = { text: "Go Back", icon: "fas fa-chevron-left" };
  rightBtn: IconBtn = { text: "Favorite", icon: "fas fa-heart" };

  constructor(
    private store: Store<AppState>,
    private matchesService: MatchesService,
    private favoritesService: FavoritesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.movieDetails$ = this.store.pipe(select(selectMatchedMovie));

    this.route.params.pipe(first()).subscribe(params => {
      this.userId = params.userId;
      this.movieId = Number(params.movieId);
      this.getMovieDetails();
    });
  }

  ngOnDestroy() {
    this.store.dispatch(
      new MatchDetailsCleared({ from: this.matchDetailsClearedMDP })
    );
  }

  // API Calls and Populate the Store
  getMovieDetails() {
    this.store.dispatch(
      new GetMatchedUserDetailsRequest({
        from: this.getMatchedUserDetailsRequestMUFDP
      })
    );
    this.matchesService.getOtherUserMovieDetails(this.userId, this.movieId);
  }

  // ------------------- CB Events ---------------------------
  // Card
  goBack() {
    this.router.navigateByUrl(`matches/user/${this.userId}`);
  }

  addToFavorites(movie) {
    showOverlay(this.store, this.fromShowOverlay);
    this.favoritesService.addToFavorites(movie, `matches/user/${this.userId}`);
  }
}
