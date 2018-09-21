import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// Rxjs
import { Observable } from "rxjs";
import { filter, tap, first } from "rxjs/operators";
// Models
import { MovieDetails } from "../../models/movie-details.model";
import { IconBtn } from "../../models/icon-btn.model";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { FavoriteDetailsCleared } from "../favorites.actions";
import { selectFavoriteDetailsFromFavorites } from "../movies.selector";
// Services
import { FavoritesService } from "../../core/services/favorites.service";

@Component({
  selector: "app-favorite-details",
  templateUrl: "./favorite-details.component.html",
  styleUrls: ["./favorite-details.component.css"]
})
export class FavoriteDetailsComponent implements OnInit, OnDestroy {
  favoriteDetails$: Observable<MovieDetails>;
  // From Actions
  favoriteDetailsClearedFDP = "FavoriteDetailsClearedFDP";
  // Top Row Btns
  backBtnLink = "movies/favorites";
  // Card Inputs
  leftBtn: IconBtn = { text: "Go Back", icon: "fas fa-chevron-left" };
  rightBtn: IconBtn = { text: "Delete", icon: "fa fa-trash" };

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(params => {
      this.getFavoriteDetails(params.id);
    });
  }

  ngOnDestroy() {
    this.store.dispatch(
      new FavoriteDetailsCleared({ from: this.favoriteDetailsClearedFDP })
    );
  }

  // -------------- API / STORE Calls --------------------
  getFavoriteDetails(id) {
    this.favoriteDetails$ = this.store.pipe(
      select(selectFavoriteDetailsFromFavorites(id)),
      filter((details: MovieDetails) => {
        // console.log("Filter - Favorite Details:", details);
        if (!details) {
          this.favoritesService.getFavorites();
        }
        return details !== null;
      }),
      first(),
      tap((details: MovieDetails) => {
        // console.log("Tap - Favorite Details:", details);
      })
    );
  }

  // ------------------- CB Events ---------------------------
  // Card
  goBack() {
    this.router.navigateByUrl("/movies/favorites");
  }

  removeFromFavorites(movie) {
    this.favoritesService.removeFromFavorites(movie.key, movie.id, "details");
  }
}
