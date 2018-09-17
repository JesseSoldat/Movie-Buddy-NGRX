import { Component, OnInit } from "@angular/core";
// Services
import { FavoritesService } from "../../core/services/favorites.service";

@Component({
  selector: "app-matches",
  templateUrl: "./matches.component.html",
  styleUrls: ["./matches.component.css"]
})
export class MatchesComponent implements OnInit {
  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService.getOtherUsersLists();
  }
}
