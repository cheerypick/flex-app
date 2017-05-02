import { FlexAppPage } from './app.po';

describe('flex-app App', () => {
  let page: FlexAppPage;

  beforeEach(() => {
    page = new FlexAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
