import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MediaInterfaceComponent } from './media-interface/media-interface.component';

const routes: Routes = [
  { path: 'media/:mhid', component: MediaInterfaceComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MediaInterfaceComponent]
})
export class MediaModule { }
