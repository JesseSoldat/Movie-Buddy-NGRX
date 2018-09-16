import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
// Models
import { Movie } from "../../../models/movie.model";
import { MovieDetails } from "../../../models/movie-details.model";
// Services
import { FavoritesService } from "../../../core/services/favorites.service";
import { MovieDbService } from "../../../core/services/moviedb.service";
// Selectors
import { createMovieDetails } from "../../../movies/movies.selector";

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

  constructor(
    private router: Router,
    private movieDbService: MovieDbService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {}

  addToFavorites() {
    this.movieDbService
      .getMovieDetails(this.movie.id)
      .pipe(first())
      .subscribe((details: MovieDetails) => {
        const movieDetails: MovieDetails = createMovieDetails(details);

        this.favoritesService.addToFavorites(movieDetails);
      });
  }

  viewDetails() {
    this.router.navigateByUrl(`/movies/${this.movie.id}`);
  }
}
