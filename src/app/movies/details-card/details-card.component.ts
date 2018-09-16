import { Component, OnInit, Input } from "@angular/core";

import { Observable } from "rxjs";
import { MovieDetails } from "../../models/movie-details.model";

@Component({
  selector: "app-details-card",
  templateUrl: "./details-card.component.html",
  styleUrls: ["./details-card.component.css"]
})
export class DetailsCardComponent implements OnInit {
  @Input("movieDetails")
  movie: MovieDetails;

  constructor() {}

  ngOnInit() {
    console.log(this.movie);
  }
}
