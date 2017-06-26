import { Component, OnInit } from '@angular/core';
import { MHSDK, MHSearch, MHMedia } from 'houndjs';
import { MH_CLIENT_ID, MH_CLIENT_KEY } from '../../_config/environment.config';

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.css']
})
export class SearchInterfaceComponent implements OnInit {
  public results: MHMedia[] = [];
  public scope: string = MHSearch.SCOPE_MOVIE;
  public scopes: {name: string, value: string}[] = [
    { name: 'Movies', value: MHSearch.SCOPE_MOVIE },
    { name: 'Books', value: MHSearch.SCOPE_BOOK },
    { name: 'Games', value: MHSearch.SCOPE_GAME }
  ];
  public term = '';

  private _isReady: Promise<undefined>;
  private _PAGE_SIZE = 24;

  public onSearch(update: {term: string, scope: string}): void {
    let searchPromise: Promise<any>;

    update.term = update.term.trim();

    if (update.term) {
      searchPromise = MHSearch.fetchResultsForSearchTerm(update.term, [update.scope], this._PAGE_SIZE);
    } else {
      searchPromise = MHSearch.fetchTopResults([update.scope], this._PAGE_SIZE);
    }

    searchPromise.then(
      (searchResults: any): void => {
        const results: MHMedia[] = [];

        for (const result of searchResults.content) {
          results.push(new MHMedia(result.object));
        }

        this.results = results;
        this.term = update.term;
        this.scope = update.scope;
      }
    );
  }

  public get resultsText(): string {
    let resultsText = '';
    const scopeName: string = this._getScopeName(this.scope);

    if (scopeName) {
      if (this._PAGE_SIZE <= this.results.length) {
        resultsText += 'Top ';
      }

      resultsText += this.results.length.toString(10) + ' ' + scopeName;

      if (this.term) {
        resultsText += ' Matching "' + this.term + '"';
      }
    }

    return resultsText;
  }

  private _getScopeName(scopeValue: string): string {
    let scopeName = '';

    for (const scope of this.scopes) {
      if (scope.value === scopeValue) {
        scopeName = scope.name;
        break;
      }
    }

    return scopeName;
  }

  ngOnInit() {
    MHSDK.configure(MH_CLIENT_ID, MH_CLIENT_KEY).then((): void => {
      this.onSearch({term: this.term, scope: this.scope});
    });
  }

}
