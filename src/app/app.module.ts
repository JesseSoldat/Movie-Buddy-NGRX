import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Modules
import { CoreModule } from "./core/core.module";
import { AuthModule } from "./auth/auth.module";
// Components
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
