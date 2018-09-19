import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// Rxjs
import { first } from "rxjs/operators";
import { Observable } from "rxjs";
// Models
import { MovieDetails } from "../../models/movie-details.model";
import { IconBtn } from "../../models/icon-btn.model";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectMovieDetails } from "../movies.selector";
import { MovieDetailsRequested, MovieDetailsCleared } from "../movie.actions";
// Services
import { MovieDbService } from "../../core/services/moviedb.service";
import { FavoritesService } from "../../core/services/favorites.service";
// Utils
import {
  errMsg,
  showOverlay,
  hideOverlay
} from "../../utils/ui.action.dispatchers";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails$: Observable<MovieDetails>;
  // From Action Types
  fromMsg = "ShowMsgMDP";
  fromShowOverlay = "ShowOverlayMDP";
  movieDetailsRequestedMDP = "MovieDetailsRequestedMDP";
  movieDetailsClearedMDP = "MovieDetailsClearedMDP";

  // Card Inputs
  leftBtn: IconBtn = { text: "Go Back", icon: "fas fa-chevron-left" };
  rightBtn: IconBtn = { text: "Favorite", icon: "fas fa-heart" };

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private movieDbService: MovieDbService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(params => {
      this.getMovieDetails(params.id);
    });

    this.movieDetails$ = this.store.pipe(select(selectMovieDetails));
  }

  ngOnDestroy() {
    this.store.dispatch(
      new MovieDetailsCleared({ from: this.movieDetailsClearedMDP })
    );
  }

  // API Calls and Populate the Store
  getMovieDetails(id: number) {
    this.store.dispatch(
      new MovieDetailsRequested({ from: this.movieDetailsRequestedMDP })
    );
    this.movieDbService
      .getMovieDetails(id)
      .subscribe(details => {}, err => errMsg(this.store, this.fromMsg));
  }

  // ------------------- CB Events ---------------------------
  // Card
  goBack() {
    this.router.navigateByUrl("/movies");
  }

  addToFavorites(movie) {
    showOverlay(this.store, this.fromShowOverlay);
    this.favoritesService.addToFavorites(movie, "/movies/favorites");
  }
}
