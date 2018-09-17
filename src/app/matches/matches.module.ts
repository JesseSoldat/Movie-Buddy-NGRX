import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// NGRX
import { StoreModule } from "@ngrx/store";
import { matchesReducer } from "./matches.reducer";
import { MatchesRoutingModule } from "./matches-routing.module";
import { SharedModule } from "../shared/shared.module";
import { MatchesComponent } from "./matches/matches.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatchesRoutingModule,
    StoreModule.forFeature("matches", matchesReducer)
  ],
  declarations: [MatchesComponent]
})
export class MatchesModule {}
