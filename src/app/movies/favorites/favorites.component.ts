import { Component, OnInit } from "@angular/core";
import { tap, filter, first } from "rxjs/operators";
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
    // this.favoritesService.getFavorites();

    this.store
      .pipe(
        select(selectFavorites),
        filter(favorites => {
          console.log("filter:", favorites);
          if (!favorites) {
            this.favoritesService.getFavorites();
          }
          return favorites !== null;
        }),
        first(),
        tap(favorites => {
          console.log("tap:", favorites);

          this.favorites = favorites;
          this.store.dispatch(new ShowSpinner({ showSpinner: false }));
        })
      )
      .subscribe(favorites => {});
  }

  onFilterText(text) {
    this.filterListBy = text;
  }
}
