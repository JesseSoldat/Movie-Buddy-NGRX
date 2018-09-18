import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
// Models
import { MovieDetails } from "../../models/movie-details.model";
// Services
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
  @Output()
  onAddToFavorites: EventEmitter<any>;

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
    this.onAddToFavorites.emit(this.movie);
    // this.favoritesService.addToFavorites(this.movie, "/movies/favorites");
  }

  removeFromFavorites() {
    this.favoritesService.removeFromFavorites(
      this.movie.key,
      this.movie.id,
      "details"
    );
  }
}
