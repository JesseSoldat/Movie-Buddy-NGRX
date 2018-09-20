import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// Rxjs
import { first, tap } from "rxjs/operators";
import { Observable } from "rxjs";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { MatchesService } from "../../core/services/matches.service";
import { GetMatchedUserRequest } from "../matches.action";
import {
  selectUserFavoriteIds,
  selectNonMatchedUserMovies
} from "../matches.selector";
// Models
import { IconBtn } from "../../models/icon-btn.model";

@Component({
  selector: "app-matched-user-favorites",
  templateUrl: "./matched-user-favorites.component.html",
  styleUrls: ["./matched-user-favorites.component.css"]
})
export class MatchedUserFavoritesComponent implements OnInit {
  matches$: Observable<any>;
  // Action From Types
  getMatchedUserRequestMP = "GetMatchedUserRequestMP";

  // Card Inputs
  leftBtn: IconBtn = { text: "View", icon: "fa fa-eye" };
  rightBtn: IconBtn = { text: "Favorite", icon: "fas fa-heart" };

  constructor(
    private store: Store<AppState>,
    private matchesService: MatchesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.matches$ = this.store.pipe(
      select(selectNonMatchedUserMovies),
      tap(matches => {
        // console.log("tap:", matches);
        if (!matches) {
          this.matchesService.getCurrentUserFavoriteIds();
        }
      })
    );

    this.route.params.subscribe(param => {
      this.store.dispatch(
        new GetMatchedUserRequest({ from: this.getMatchedUserRequestMP })
      );

      this.matchesService.getOtherUserMovies(param.id);
    });
  }

  leftBtnClick(e) {}

  rightBtnClick(e) {}

  // TEMP COPIED FROM MOVIE SEARCH PAGE
  // Card
  // handleView(keys: MovieKeys) {
  //   this.router.navigateByUrl(`/movies/${keys.id}`);
  // }

  // addToFavorites(keys: MovieKeys) {
  //   showOverlay(this.store, this.fromShowOverlay);

  //   this.store.dispatch(
  //     new MovieDetailsRequested({ from: this.movieDetailsRequested })
  //   );

  //   this.movieDbService.getMovieDetails(keys.id).subscribe(
  //     (details: MovieDetails) => {
  //       const movieDetails: MovieDetails = createMovieDetails(details);
  //       this.store.dispatch(
  //         new MovieDetailsCleared({ from: this.movieDetailsClearedMSP })
  //       );

  //       this.favoritesService.addToFavorites(movieDetails);
  //     },
  //     err => {
  //       const msg = "An error ocurred while trying to add the movie";
  //       errMsg(this.store, this.fromMsg, msg);
  //     }
  //   );
  // }
}
