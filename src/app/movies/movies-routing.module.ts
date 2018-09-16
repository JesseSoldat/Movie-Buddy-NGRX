import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MoviesSearchComponent } from "./movies-search/movies-search.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";

const routes: Routes = [
  { path: "", component: MoviesSearchComponent },
  { path: ":id", component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
