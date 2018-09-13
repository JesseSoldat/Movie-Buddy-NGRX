import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
// NGRX
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from "@ngrx/router-store";
import { reducers, metaReducers } from "../reducers";
import { CustomSerializer } from "../reducers/customSerialize";
import { EffectsModule } from "@ngrx/effects";
// Routing
import { AppRoutingModule } from "../app-routing.module";
// ENV
import { environment } from "../../environments/environment";
// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
// Components
import { NavbarComponent } from "./navbar/navbar.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { MessageComponent } from "./message/message.component";

// Services
import { AuthService } from "./services/auth.service";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    EffectsModule.forRoot([])
  ],
  exports: [AppRoutingModule, NavbarComponent, MessageComponent],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    AuthService
  ],
  declarations: [NavbarComponent, WelcomeComponent, MessageComponent]
})
export class CoreModule {}
