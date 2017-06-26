import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MHMedia, MHSDK } from 'houndjs';
import { MH_CLIENT_ID, MH_CLIENT_KEY } from '../../_config/environment.config';

@Component({
  selector: 'app-media-interface',
  templateUrl: './media-interface.component.html',
  styleUrls: ['./media-interface.component.css']
})
export class MediaInterfaceComponent implements OnInit {
  private _activatedRoute: ActivatedRoute;

  private _item: MHMedia;
  public get item(): MHMedia {
    return this._item;
  }

  public get imageSrc(): string {
    let src = '';

    if (this.item.primaryImage) {
      src = this.item.primaryImage.metadata.large.url;
    }

    return src;
  }

  public get releaseDate(): string {
    return this.item.metadata.releaseDate.toUTCString();
  }

  public get contributors(): any[] {
    const contributors: any[] = [];

    if (this.item.keyContributors) {
      for (const person of this.item.keyContributors) {
        contributors.push(person);
      }
    }

    return contributors;
  }

  public getContribImageSrc(contributor: any) {
    let src = '';

    if (
      contributor
      && contributor.object
      && contributor.object.primaryImage
      && contributor.object.primaryImage.metadata
    ) {
      src = contributor.object.primaryImage.metadata.thumbnail.url;
    }

    return src;
  }

  public getContribName(contributor: any) {
    let name = '';

    if (
      contributor
      && contributor.object
      && contributor.object.metadata
      && contributor.object.metadata.name
    ) {
      name = contributor.object.metadata.name;
    }

    return name;
  }

  public getContribRoles(contributor: any) {
    let roles = '';

    if (
      contributor
      && contributor.context
      && contributor.context.relationships
      && contributor.context.relationships.length > 0
    ) {
      const rolesArray: string[] = [];

      for (const rel of contributor.context.relationships) {
        let contribString: string = rel.contribution.toString().toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
          return m.toUpperCase();
        });

        if (rel.role) {
          contribString += ' (' + rel.role + ')';
        }

        rolesArray.push(contribString);
      }

      roles = rolesArray.join(', ');
    }

    return roles;
  }

  constructor(activatedRoute: ActivatedRoute) {
    this._activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      (params: Params): void => {
        const mhid: string = (params as {mhid: string}).mhid;

        MHSDK.configure(MH_CLIENT_ID, MH_CLIENT_KEY).then((): void => {
          MHMedia.fetchByMhid(mhid).then((item: MHMedia): void => {
            item.fetchContributors().then((): void => {
              this._item = new MHMedia(item);
            });

            item.fetchRelated().then((rel: any) => { console.log(rel); });
          });
        });
      }
    );
  }

}
