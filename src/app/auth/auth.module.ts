import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// NGRX
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth.effects";
// Modules
import { SharedModule } from "../shared/shared.module";
// Routing
import { AuthRoutingModule } from "./auth-routing.module";
// Components
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthFormComponent } from "./auth-form/auth-form.component";
// Services
import { AuthService } from "./auth.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature("auth", fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginComponent, RegisterComponent, AuthFormComponent],
  providers: [AuthService]
})
export class AuthModule {}
