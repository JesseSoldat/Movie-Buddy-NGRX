import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
// NGRX
import { StoreModule } from "@ngrx/store";
import { sharedReducer } from "./reducers/shared.reducer";
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
import { HeadingComponent } from "./components/heading/heading.component";
import { OverlayComponent } from "./components/overlay/overlay.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { IconBtnComponent } from "./components/icon-btn/icon-btn.component";

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
    FormGroupComponent,
    HeadingComponent,
    OverlayComponent,
    SpinnerComponent,
    IconBtnComponent,
    // Directives
    OnBlurDirective,
    // Pipes
    TruncateTextPipe
  ],
  declarations: [
    SearchBoxComponent,
    FormGroupComponent,
    OnBlurDirective,
    HeadingComponent,
    OverlayComponent,
    SpinnerComponent,
    IconBtnComponent,
    TruncateTextPipe
  ]
})
export class SharedModule {}
