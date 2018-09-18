import { Component, OnInit } from "@angular/core";
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
import { ShowMsg } from "../../shared/shared.actions";
// Services
import { MovieDbService } from "../../core/services/moviedb.service";
import { FavoritesService } from "../../core/services/favorites.service";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit {
  errMsg = "An error ocurred while fetching the data.";
  movieDetails$: Observable<MovieDetails>;

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
      this.movieDbService
        .getMovieDetails(params.id)
        .pipe(first())
        .subscribe(
          details => this.handleSuccess(),
          err => this.handleError(),
          () => this.handleSuccess("complete")
        );
    });

    this.movieDetails$ = this.store.pipe(select(selectMovieDetails));
  }

  handleSuccess(type = "success") {
    if (type === "complete") {
      console.log("Complete: Movie Details - getMovieDetails");
    }
  }

  handleError(msg = this.errMsg) {
    this.store.dispatch(
      new ShowMsg({
        msg: {
          title: "Error",
          msg,
          color: "red"
        },
        from: "ShowMsgMDP"
      })
    );
  }

  // ------------------- CB Events ---------------------------
  // Card
  goBack() {
    this.router.navigateByUrl("/movies");
  }

  addToFavorites(movie) {
    this.favoritesService.addToFavorites(movie, "/movies/favorites");
  }
}
