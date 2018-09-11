import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
// Components
import { SearchBoxComponent } from "./search-box/search-box.component";
import { CardComponent } from "./card/card.component";
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FormGroupComponent } from "./inputs/form-group/form-group.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchBoxComponent,
    CardComponent,
    FormGroupComponent
  ],
  declarations: [SearchBoxComponent, CardComponent, FormGroupComponent]
})
export class SharedModule {}
