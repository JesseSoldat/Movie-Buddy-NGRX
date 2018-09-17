import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MoviesSearchComponent } from "./movies-search/movies-search.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { FavoriteDetailsComponent } from "./favorite-details/favorite-details.component";

const routes: Routes = [
  { path: "", component: MoviesSearchComponent },
  { path: "favorites", component: FavoritesComponent },
  { path: "favorites/:id", component: FavoriteDetailsComponent },
  { path: ":id", component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
