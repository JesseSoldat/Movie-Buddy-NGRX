import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";

import { MovieDetails } from "../../models/movie-details.model";
import { selectMovieDetails } from "../movies.selector";
import { MovieDbService } from "../../core/services/moviedb.service";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit {
  movieDetail$: Observable<MovieDetails>;
  movie;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private movieDbService: MovieDbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieDbService.getMovieDetails(params.id);

      this.store
        .pipe(
          select(selectMovieDetails),
          tap(m => {
            if (m) {
              console.log("movie:", m);
            }
          })
        )
        .subscribe(m => (this.movie = m));
    });
  }
}
