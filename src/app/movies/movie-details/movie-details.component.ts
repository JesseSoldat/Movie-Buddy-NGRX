import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";

import { GetMovieDetails } from "../../shared/actions/movie.actions";
import { MovieDbService } from "../../core/services/moviedb.service";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private movieDbService: MovieDbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.movieDbService.getMovieDetails(params.id);
    });
  }
}
