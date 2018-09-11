import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthFormComponent } from './auth-form/auth-form.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent, RegisterComponent, AuthFormComponent]
})
export class AuthModule { }
