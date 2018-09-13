import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MoviesRoutingModule } from "./movies-routing.module";

@NgModule({
  imports: [CommonModule, MoviesRoutingModule],
  exports: [MoviesRoutingModule],
  declarations: []
})
export class MoviesModule {}
