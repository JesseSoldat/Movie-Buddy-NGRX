import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
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
  movieDetails$: Observable<MovieDetails>;
  parent$: Observable<Params>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private movieDbService: MovieDbService
  ) {}

  ngOnInit() {
    this.parent$ = this.route.queryParams.pipe(map(params => params.parent));

    this.route.params.subscribe(params => {
      this.movieDbService.getMovieDetails(params.id).subscribe(details => {});
    });

    this.movieDetails$ = this.store.pipe(select(selectMovieDetails));
  }
}
