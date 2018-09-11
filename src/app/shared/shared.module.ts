import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchBoxComponent, CardComponent]
})
export class SharedModule { }
