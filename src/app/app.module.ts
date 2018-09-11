import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Modules
import { CoreModule } from "./core/core.module";
// Components
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
