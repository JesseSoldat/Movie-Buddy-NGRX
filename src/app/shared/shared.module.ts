import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
// NGRX
import { StoreModule } from "@ngrx/store";
import { sharedReducer } from "./shared.reducer";
// Components
import { SearchBoxComponent } from "./search-box/search-box.component";
import { CardComponent } from "./card/card.component";
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FormGroupComponent } from "./inputs/form-group/form-group.component";
// Directive
import { OnBlurDirective } from "./inputs/blur.directive";
import { HeadingComponent } from "./heading/heading.component";
import { OverlayComponent } from "./overlay/overlay.component";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    StoreModule.forFeature("shared", sharedReducer)
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Components
    SearchBoxComponent,
    CardComponent,
    FormGroupComponent,
    HeadingComponent,
    OverlayComponent,
    SpinnerComponent,
    // Directives
    OnBlurDirective
  ],
  declarations: [
    SearchBoxComponent,
    CardComponent,
    FormGroupComponent,
    OnBlurDirective,
    HeadingComponent,
    OverlayComponent,
    SpinnerComponent
  ]
})
export class SharedModule {}
