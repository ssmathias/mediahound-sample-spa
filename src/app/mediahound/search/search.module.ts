import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchInterfaceComponent } from './search-interface/search-interface.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'search', component: SearchInterfaceComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchInputComponent, SearchResultComponent, SearchInterfaceComponent]
})
export class SearchModule { }
