import { Component, Input, OnInit } from '@angular/core';
import { MHMedia } from 'houndjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  private _result: MHMedia;
  @Input() public set result(result: MHMedia) {
    // Expected to be an MHMedia
    this._result = result;
  }
  public get result(): MHMedia {
    return this._result;
  }

  private _linkBase: string;
  @Input() public set linkBase(base: string) {
    this._linkBase = base;
  }

  public get imageUrl(): string {
    let imageUrl = '';

    if (
      this.result.primaryImage
      && this.result.primaryImage.metadata
    ) {
      if (this.result.primaryImage.metadata.thumbnail) {
        imageUrl = this.result.primaryImage.metadata.thumbnail.url;
      } else if (this.result.primaryImage.metadata.original) {
        imageUrl = this.result.primaryImage.metadata.original.url;
      }
    }

    return imageUrl;
  }

  public get imageName(): string {
    let imageName = '';

    if (
      this.result.primaryImage
      && this.result.primaryImage.metadata
    ) {
      imageName = this.result.primaryImage.metadata.name;
    }

    return imageName;
  }

  public get itemTitle(): string {
    let title = '';

    if (this.result.metadata.name) {
      title += this.result.metadata.name;
    }

    // Something is wrong with the automatic creation of MHMedia in the SDK. Disabling this for now.
    /*
    if (this.result.metadata.releaseDate) {
      title += ' (' + this.result.metadata.releaseDate.getYear().toString(10) + ')';
    }
    */

    return title;
  }

  public get itemLink(): string {
    return (this._linkBase) ? (this._linkBase + this.result.metadata.mhid) : '';
  }

}
