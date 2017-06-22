import { MediahoundPage } from './app.po';

describe('mediahound App', () => {
  let page: MediahoundPage;

  beforeEach(() => {
    page = new MediahoundPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
