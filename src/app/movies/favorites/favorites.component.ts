import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { Observable } from "rxjs";
import { tap, filter, first } from "rxjs/operators";
// Models
import { MovieDetails } from "../../models/movie-details.model";
import { MovieKeys } from "../../models/movie-keys.model";
import { IconBtn } from "../../models/icon-btn.model";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectFavorites } from "../movies.selector";
import { FavoritesRequested, FavoritesLoaded } from "../favorites.actions";
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
  // From Action Types
  favoritesLoadedFromLocalStorageFP = "FavoritesLoadedFromLocalStorageFP";
  favoritesRequestedFP = "FavoritesRequestedFP";

  // Filter Box Inputs
  filterListBy = "";

  // Card Inputs
  leftBtn: IconBtn = { text: "View", icon: "fa fa-eye" };
  rightBtn: IconBtn = { text: "Delete", icon: "fa fa-trash" };

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadDataFromStorage() {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites"));
      if (favorites) {
        this.store.dispatch(
          new FavoritesLoaded({
            favoritesList: favorites,
            from: this.favoritesLoadedFromLocalStorageFP
          })
        );
      } else {
        this.favoritesService.getFavorites();
      }
    } catch (err) {
      this.favoritesService.getFavorites();
    }
  }

  loadFavorites() {
    this.favorites$ = this.store.pipe(
      select(selectFavorites),
      filter((favorites: MovieDetails[]) => {
        if (!favorites) {
          this.store.dispatch(
            new FavoritesRequested({ from: this.favoritesRequestedFP })
          );
          this.loadDataFromStorage();
        }
        return favorites !== null;
      }),
      tap((favorites: MovieDetails[]) => {
        // console.log("tap:", favorites);
        this.favorites = favorites;
      })
    );
  }

  // ---------------- CB Events ---------------------

  // Filter Box
  onFilterText(text) {
    this.filterListBy = text;
  }

  // Card
  handleView(keys: MovieKeys) {
    this.router.navigateByUrl(`/movies/favorites/${keys.key}`);
  }

  removeFromFavorites(keys: MovieKeys) {
    this.favoritesService.removeFromFavorites(keys.key, keys.id);
  }
}
