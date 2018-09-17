import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { movieReducer } from "./movie.reducer";

import { MoviesRoutingModule } from "./movies-routing.module";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { DetailsCardComponent } from "./details-card/details-card.component";
import { MoviesSearchComponent } from "./movies-search/movies-search.component";
import { FavoritesComponent } from './favorites/favorites.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card/card.component';
import { FavoriteDetailsComponent } from './favorite-details/favorite-details.component';
import { MatchesComponent } from './matches/matches.component';

@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    StoreModule.forFeature("movie", movieReducer)
  ],
  exports: [MoviesRoutingModule],
  declarations: [
    MovieDetailsComponent,
    DetailsCardComponent,
    MoviesSearchComponent,
    FavoritesComponent,
    CardListComponent,
    CardComponent,
    FavoriteDetailsComponent,
    MatchesComponent
  ]
})
export class MoviesModule {}
