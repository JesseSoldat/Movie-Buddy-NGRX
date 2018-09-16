import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
// Models
import { MovieDetails } from "../../models/movie-details.model";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectFavorites } from "../movies.selector";
// Services
import { FavoritesService } from "../../core/services/favorites.service";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<MovieDetails[]>;

  constructor(
    private store: Store<AppState>,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.favorites$ = this.store.pipe(
      select(selectFavorites),
      tap(favorites => {
        if (favorites.length <= 0) {
          this.favoritesService.getFavorites();
        }
      })
    );
  }
}
