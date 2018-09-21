import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// Rxjs
import { first, tap } from "rxjs/operators";
import { Observable } from "rxjs";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import {
  GetUserFavoriteIdsRequest,
  GetMatchedUserRequest
} from "../matches.action";
import { selectNonMatchedUserMovies } from "../matches.selector";
// Models
import { IconBtn } from "../../models/icon-btn.model";
import { MovieKeys } from "../../models/movie-keys.model";
import { MatchedUser } from "../../models/matched-user.model";
import { FbUser } from "../../models/fb-user.model";
// Services
import { MatchesService } from "../../core/services/matches.service";
import { FavoritesService } from "../../core/services/favorites.service";
// Utils
import { showOverlay } from "../../utils/ui.action.dispatchers";

@Component({
  selector: "app-matched-user-favorites",
  templateUrl: "./matched-user-favorites.component.html",
  styleUrls: ["./matched-user-favorites.component.css"]
})
export class MatchedUserFavoritesComponent implements OnInit {
  matches$: Observable<any>;
  favorites;
  username: string;

  matchedUserId: string;
  // Action From Types
  fromShowOverlay = "ShowOverlayMUFP";
  getMatchedUserRequestMUFP = "GetMatchedUserRequestMUFP";
  getUserFavoriteIdsRequestMUFP = "GetUserFavoriteIdsRequestMUFP";

  // Top Row Btns
  backBtnLink = "/matches";
  // Card Inputs
  leftBtn: IconBtn = { text: "View", icon: "fa fa-eye" };
  rightBtn: IconBtn = { text: "Favorite", icon: "fas fa-heart" };

  constructor(
    private store: Store<AppState>,
    private matchesService: MatchesService,
    private route: ActivatedRoute,
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.matches$ = this.store.pipe(
      select(selectNonMatchedUserMovies),
      tap(matches => {
        if (!matches) {
          this.store.dispatch(
            new GetUserFavoriteIdsRequest({
              from: this.getUserFavoriteIdsRequestMUFP
            })
          );
          this.matchesService.getCurrentUserFavoriteIds();
        } else {
          this.username = matches.user.username;
          this.favorites = matches.favorites;
        }
      })
    );

    this.route.params.pipe(first()).subscribe(param => {
      this.matchedUserId = param.userId;

      this.store.dispatch(
        new GetMatchedUserRequest({ from: this.getMatchedUserRequestMUFP })
      );

      this.matchesService.getOtherUserMovies(this.matchedUserId);
    });
  }

  // Card
  handleView(keys: MovieKeys) {
    this.router.navigateByUrl(
      `/matches/details/${this.matchedUserId}/${keys.id}`
    );
  }

  addToFavorites(keys: MovieKeys) {
    showOverlay(this.store, this.fromShowOverlay);

    const movie = this.favorites.find(obj => obj.id === keys.id);

    this.favoritesService.addToFavorites(movie);
  }
}
