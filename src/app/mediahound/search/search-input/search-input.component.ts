import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {

  private _searchTerm: string;
  @Input() public set searchTerm(searchTerm: string) {
    this._searchTerm = searchTerm;
  }
  public get searchTerm(): string {
    return this._searchTerm;
  }

  private _searchScope: string;
  @Input() public set searchScope(searchScope: string) {
    this._searchScope = searchScope;
  }
  public get searchScope(): string {
    return this._searchScope;
  }

  private _searchScopes: {name: string, value: string}[];
  @Input() public set searchScopes(searchScopes: {name: string, value: string}[]) {
    this._searchScopes = searchScopes;
  }
  public get searchScopes(): {name: string, value: string}[] {
    return this._searchScopes;
  }

  @Output() onSearch: EventEmitter<{term: string, scope: string}> = new EventEmitter<{term: string, scope: string}>();

  public getScopeColClass(): string {
    return 'col-xs-4 col-sm-3';
  }

  public doSearch() {
    this.onSearch.emit({term: this.searchTerm, scope: this.searchScope});
  }
}
