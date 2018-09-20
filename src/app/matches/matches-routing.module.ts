import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MatchedUsersComponent } from "./matched-users/matched-users.component";
import { MatchedUserFavoritesComponent } from "./matched-user-favorites/matched-user-favorites.component";
import { MatchedUserFavoriteDetailsComponent } from "./matched-user-favorite-details/matched-user-favorite-details.component";

const routes: Routes = [
  { path: "", component: MatchedUsersComponent },
  { path: "user/:userId", component: MatchedUserFavoritesComponent },
  {
    path: "details/:userId/:movieId",
    component: MatchedUserFavoriteDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule {}
