import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
// Models
import { MovieDetails } from "../../models/movie-details.model";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectMovieDetails } from "../movies.selector";
import { ShowSpinner, ShowMsg } from "../../shared/shared.actions";
// Services
import { MovieDbService } from "../../core/services/moviedb.service";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit {
  errMsg = "An error ocurred while fetching the data.";
  movieDetails$: Observable<MovieDetails>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private movieDbService: MovieDbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieDbService
        .getMovieDetails(params.id)
        .subscribe(details => this.handleSuccess(), err => this.handleError());
    });

    this.movieDetails$ = this.store.pipe(select(selectMovieDetails));
  }

  handleSuccess() {
    this.store.dispatch(new ShowSpinner({ showSpinner: false }));
  }

  handleError(msg = this.errMsg) {
    this.store.dispatch(
      new ShowMsg({
        msg: {
          title: "Error",
          msg,
          color: "red"
        }
      })
    );
  }
}
