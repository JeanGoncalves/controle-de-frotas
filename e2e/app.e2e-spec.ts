import { ControleDeFrotasPage } from './app.po';

describe('controle-de-frotas App', () => {
  let page: ControleDeFrotasPage;

  beforeEach(() => {
    page = new ControleDeFrotasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
