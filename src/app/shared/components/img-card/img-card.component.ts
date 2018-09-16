import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Movie } from "../../../models/movie.model";

@Component({
  selector: "app-img-card",
  templateUrl: "./img-card.component.html",
  styleUrls: ["./img-card.component.css"]
})
export class ImgCardComponent implements OnInit {
  @Input()
  movie: Movie;
  @Input()
  cardSize = "250px";

  constructor(private router: Router) {}

  ngOnInit() {}

  addToFavorites() {}

  viewDetails() {
    this.router.navigateByUrl(`/movies/${this.movie.id}`);
  }
}
