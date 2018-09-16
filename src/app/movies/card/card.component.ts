import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
// Models
import { Movie } from "../../models/movie.model";
import { MovieDetails } from "../../models/movie-details.model";
// Services
import { FavoritesService } from "../../core/services/favorites.service";
import { MovieDbService } from "../../core/services/moviedb.service";
// Selectors
import { createMovieDetails } from "../movies.selector";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
  @Input()
  movie: Movie | MovieDetails;
  @Input()
  parent: string;
  @Input()
  cardSize = "250px";

  constructor(
    private router: Router,
    private movieDbService: MovieDbService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {}

  viewDetails() {
    let id, url;
    if (this.parent === "search") {
      id = this.movie.id;
      url = `/movies/${id}`;
    } else {
      id = this.movie.key;
      url = `/movies/favorites/${id}`;
    }
    this.router.navigateByUrl(url);
  }

  addToFavorites() {
    this.movieDbService
      .getMovieDetails(this.movie.id)
      .pipe(first())
      .subscribe((details: MovieDetails) => {
        const movieDetails: MovieDetails = createMovieDetails(details);

        this.favoritesService.addToFavorites(movieDetails);
      });
  }

  removeFromFavorites() {
    this.favoritesService.removeFromFavorites(this.movie.key, this.movie.id);
  }
}
