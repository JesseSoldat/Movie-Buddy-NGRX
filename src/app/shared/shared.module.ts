import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchBoxComponent } from "./search-box/search-box.component";
import { CardComponent } from "./card/card.component";

// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

@NgModule({
  imports: [CommonModule, AngularFireAuthModule],
  declarations: [SearchBoxComponent, CardComponent]
})
export class SharedModule {}
