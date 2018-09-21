import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
// NGRX
import { StoreModule } from "@ngrx/store";
import { sharedReducer } from "./shared.reducer";
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
// Directive
import { OnBlurDirective } from "./directives/blur.directive";
// Pipes
import { TruncateTextPipe } from "./pipes/truncate-text.pipe";
import { FilterListPipe } from "./pipes/filter-list.pipe";
// Components
import { FormGroupComponent } from "./components/inputs/form-group/form-group.component";
import { SearchBoxComponent } from "./components/search-box/search-box.component";
import { HeadingComponent } from "./components/heading/heading.component";
import { OverlayComponent } from "./components/overlay/overlay.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { FilterBoxComponent } from "./components/filter-box/filter-box.component";
import { CardComponent } from "./components/card/card.component";
import { DetailsCardComponent } from "./components/details-card/details-card.component";
import { TopRowBtnsComponent } from "./components/top-row-btns/top-row-btns.component";

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
    FilterBoxComponent,
    CardComponent,
    DetailsCardComponent,
    TopRowBtnsComponent,
    // Directives
    OnBlurDirective,
    // Pipes
    TruncateTextPipe,
    FilterListPipe
  ],
  declarations: [
    SearchBoxComponent,
    FormGroupComponent,
    OnBlurDirective,
    HeadingComponent,
    OverlayComponent,
    SpinnerComponent,
    TruncateTextPipe,
    FilterListPipe,
    FilterBoxComponent,
    CardComponent,
    DetailsCardComponent,
    TopRowBtnsComponent
  ]
})
export class SharedModule {}
