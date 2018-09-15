import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MoviesRoutingModule } from "./movies-routing.module";
import { MovieDetailsComponent } from './movie-details/movie-details.component';

@NgModule({
  imports: [CommonModule, MoviesRoutingModule],
  exports: [MoviesRoutingModule],
  declarations: [MovieDetailsComponent]
})
export class MoviesModule {}
