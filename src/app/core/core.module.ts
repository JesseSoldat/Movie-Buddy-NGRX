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

// Components
import { NavbarComponent } from "./navbar/navbar.component";

// ENV
import { environment } from "../../environments/environment";
// Firebase
import { AngularFireModule } from "@angular/fire";
import { WelcomeComponent } from "./welcome/welcome.component";
import { MessageComponent } from "./message/message.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    EffectsModule.forRoot([])
  ],
  exports: [AppRoutingModule, NavbarComponent, MessageComponent],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  declarations: [NavbarComponent, WelcomeComponent, MessageComponent]
})
export class CoreModule {}
