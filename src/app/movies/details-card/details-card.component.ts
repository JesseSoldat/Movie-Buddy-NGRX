import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { MovieDetails } from "../../models/movie-details.model";
import { FavoritesService } from "../../core/services/favorites.service";

@Component({
  selector: "app-details-card",
  templateUrl: "./details-card.component.html",
  styleUrls: ["./details-card.component.css"]
})
export class DetailsCardComponent implements OnInit {
  @Input("movieDetails")
  movie: MovieDetails;
  @Input("parent")
  parent: string;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {}

  goBack() {
    this.parent === "search"
      ? this.router.navigateByUrl("/movies")
      : this.router.navigateByUrl("/movies/favorites");
  }

  addToFavorites() {
    console.log("add");
  }

  removeFromFavorites() {
    this.favoritesService.removeFromFavorites(
      this.movie.key,
      this.movie.id,
      "details"
    );
  }
}
