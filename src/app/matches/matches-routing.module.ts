import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MatchesComponent } from "./matches/matches.component";
import { MatchDetailsComponent } from "./match-details/match-details.component";

const routes: Routes = [
  { path: "", component: MatchesComponent },
  { path: ":id", component: MatchDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule {}
