import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FavoritesRoutingModule } from "./favorites-routing.module";
import { FavoritesComponent } from "./favorites/favorites.component";

@NgModule({
  imports: [CommonModule, FavoritesRoutingModule],
  exports: [FavoritesRoutingModule],
  declarations: [FavoritesComponent]
})
export class FavoritesModule {}
