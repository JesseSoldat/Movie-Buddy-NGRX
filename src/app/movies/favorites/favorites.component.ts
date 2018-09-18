import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap, filter, first } from "rxjs/operators";
// Models
import { MovieDetails } from "../../models/movie-details.model";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectFavorites } from "../movies.selector";
import { FavoritesRequested } from "../favorites.actions";
// Services
import { FavoritesService } from "../../core/services/favorites.service";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<MovieDetails[]>;
  favorites: MovieDetails[];
  filterListBy = "";

  constructor(
    private store: Store<AppState>,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.favorites$ = this.store.pipe(
      select(selectFavorites),
      filter(favorites => {
        console.log("filter:", favorites);
        if (!favorites) {
          this.store.dispatch(new FavoritesRequested("FavoritesRequestedFP"));
          this.favoritesService.getFavorites();
        }
        return favorites !== null;
      }),
      first(),
      tap(favorites => {
        console.log("tap:", favorites);
        this.favorites = favorites;
      })
    );
  }

  onFilterText(text) {
    this.filterListBy = text;
  }
}
