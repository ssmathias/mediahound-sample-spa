import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModule } from './search/search.module';
import { MediaModule } from './media/media.module';

@NgModule({
  imports: [
    CommonModule,
    SearchModule,
    MediaModule
  ],
  declarations: [],
  exports: []
})
export class MediahoundModule { }
