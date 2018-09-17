import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs/operators";
// Models
import { MovieDetails } from "../../models/movie-details.model";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectFavorites } from "../movies.selector";
import { ShowSpinner } from "../../shared/shared.actions";
// Services
import { FavoritesService } from "../../core/services/favorites.service";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit {
  favorites: MovieDetails[];
  filterListBy = "";

  constructor(
    private store: Store<AppState>,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.store.dispatch(new ShowSpinner({ showSpinner: true }));
    this.store
      .pipe(
        select(selectFavorites),
        tap(favorites => {
          if (favorites.length <= 0) {
            this.favoritesService.getFavorites();
          } else {
            this.store.dispatch(new ShowSpinner({ showSpinner: false }));
          }
        })
      )
      .subscribe(favorites => {
        this.favorites = favorites;
      });
  }

  onFilterText(text) {
    this.filterListBy = text;
  }
}
