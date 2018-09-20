import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MatchedUsersComponent } from "./matched-users/matched-users.component";
import { MatchedUserFavoritesComponent } from "./matched-user-favorites/matched-user-favorites.component";

const routes: Routes = [
  { path: "", component: MatchedUsersComponent },
  { path: "user/:id", component: MatchedUserFavoritesComponent }
  // { path: "details/:id", component: MatchDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule {}
