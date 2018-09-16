import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

// Components
import { WelcomeComponent } from "./core/welcome/welcome.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  // {
  //   path: "dashboard",
  //   loadChildren: "./dashboard/dashboard.module#DashboardModule"
  // },
  {
    path: "movies",
    loadChildren: "./movies/movies.module#MoviesModule"
  },
  {
    path: "favorites",
    loadChildren: "./favorites/favorites.module#FavoritesModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
