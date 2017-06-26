import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModule } from './search/search.module';

@NgModule({
  imports: [
    CommonModule,
    SearchModule
  ],
  declarations: [],
  exports: [SearchModule]
})
export class MediahoundModule { }
