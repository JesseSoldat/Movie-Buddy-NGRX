import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// NGRX
import { StoreModule } from "@ngrx/store";
import { matchesReducer } from "./matches.reducer";
import { MatchesRoutingModule } from "./matches-routing.module";
import { SharedModule } from "../shared/shared.module";
import { MatchedUsersComponent } from "./matched-users/matched-users.component";
import { MatchedUserFavoritesComponent } from "./matched-user-favorites/matched-user-favorites.component";
import { MatchedUserFavoriteDetailsComponent } from "./matched-user-favorite-details/matched-user-favorite-details.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatchesRoutingModule,
    StoreModule.forFeature("matches", matchesReducer)
  ],
  declarations: [
    MatchedUsersComponent,
    MatchedUserFavoritesComponent,
    MatchedUserFavoriteDetailsComponent
  ]
})
export class MatchesModule {}
