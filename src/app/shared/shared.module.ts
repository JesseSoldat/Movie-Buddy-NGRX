import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
// NGRX
import { StoreModule } from "@ngrx/store";
import { sharedReducer } from "./reducers/shared.reducer";
import { movieReducer } from "./reducers/movie.reducer";
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FormGroupComponent } from "./inputs/form-group/form-group.component";
// Directive
import { OnBlurDirective } from "./inputs/blur.directive";
// Components
import { SearchBoxComponent } from "./search-box/search-box.component";
import { CardComponent } from "./card/card.component";
import { CardListComponent } from "./card-list/card-list.component";
import { HeadingComponent } from "./heading/heading.component";
import { OverlayComponent } from "./overlay/overlay.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { IconBtnComponent } from "./icon-btn/icon-btn.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    StoreModule.forFeature("shared", sharedReducer),
    StoreModule.forFeature("movie", movieReducer)
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Components
    SearchBoxComponent,
    CardComponent,
    CardListComponent,
    FormGroupComponent,
    HeadingComponent,
    OverlayComponent,
    SpinnerComponent,
    IconBtnComponent,
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
    SpinnerComponent,
    CardListComponent,
    IconBtnComponent
  ]
})
export class SharedModule {}
