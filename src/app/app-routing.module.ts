import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

// Components
import { WelcomeComponent } from "./core/welcome/welcome.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
