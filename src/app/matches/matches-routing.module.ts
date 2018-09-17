import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MatchedUsersComponent } from "./matched-users/matched-users.component";
import { MatchesComponent } from "./matches/matches.component";
import { MatchDetailsComponent } from "./match-details/match-details.component";

const routes: Routes = [
  { path: "", component: MatchedUsersComponent },
  { path: "user/:id", component: MatchesComponent },
  { path: "details/:id", component: MatchDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule {}
