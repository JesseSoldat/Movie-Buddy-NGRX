import { Component, OnInit } from "@angular/core";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectUserUid } from "../../auth/auth.selectors";
// Services
import { FavoritesService } from "../../core/services/favorites.service";

@Component({
  selector: "app-matches",
  templateUrl: "./matches.component.html",
  styleUrls: ["./matches.component.css"]
})
export class MatchesComponent implements OnInit {
  uid: string;

  constructor(
    private store: Store<AppState>,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.store.pipe(select(selectUserUid)).subscribe(uid => (this.uid = uid));
    this.favoritesService.getOtherUsersLists();
  }
}
