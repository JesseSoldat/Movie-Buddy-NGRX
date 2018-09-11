import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
// NGRX
import { StoreModule } from "@ngrx/store";
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

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    EffectsModule.forRoot([])
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  declarations: [NavbarComponent]
})
export class CoreModule {}
