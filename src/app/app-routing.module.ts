import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

// Components
import { WelcomeComponent } from "./core/welcome/welcome.component";

const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  {
    path: "movies",
    loadChildren: "./movies/movies.module#MoviesModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
