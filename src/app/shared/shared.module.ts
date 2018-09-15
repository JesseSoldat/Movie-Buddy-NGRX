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
// Directive
import { OnBlurDirective } from "./directives/blur.directive";
// Pipes
import { TruncateTextPipe } from "./pipes/truncateText.pipe";
// Components
import { FormGroupComponent } from "./components/inputs/form-group/form-group.component";
import { SearchBoxComponent } from "./components/search-box/search-box.component";
import { CardComponent } from "./components/card/card.component";
import { CardListComponent } from "./components/card-list/card-list.component";
import { HeadingComponent } from "./components/heading/heading.component";
import { OverlayComponent } from "./components/overlay/overlay.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { IconBtnComponent } from "./components/icon-btn/icon-btn.component";
import { ImgCardComponent } from "./components/img-card/img-card.component";

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
    ImgCardComponent,
    // Directives
    OnBlurDirective,
    // Pipes
    TruncateTextPipe
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
    IconBtnComponent,
    ImgCardComponent,
    TruncateTextPipe
  ]
})
export class SharedModule {}
