import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { FavoritesService } from "../../core/services/favorites.service";
import { selectFavoriteDetailsFromFavorites } from "../movies.selector";

@Component({
  selector: "app-favorite-details",
  templateUrl: "./favorite-details.component.html",
  styleUrls: ["./favorite-details.component.css"]
})
export class FavoriteDetailsComponent implements OnInit {
  favoriteDetails;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store
        .pipe(select(selectFavoriteDetailsFromFavorites(params.id)))
        .subscribe(details => {
          if (details) {
            this.favoriteDetails = details;
          } else {
            this.favoritesService.getFavorites();
          }
        });
    });
  }
}
