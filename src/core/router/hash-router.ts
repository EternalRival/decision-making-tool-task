import type AbstractComponent from '~/core/models/abstract-component';
import Route from '~/core/models/route.enum';

type Props = {
  root: HTMLElement;
  routes: Record<string, () => AbstractComponent>;
  errorPage: () => AbstractComponent;
};

export default class HashRouter {
  private currentPage?: AbstractComponent;

  constructor(private readonly props: Props) {}

  public static readonly navigate = (route = Route.HOME): void => {
    globalThis.location.hash = route;
  };

  public initRouter(): void {
    globalThis.addEventListener('hashchange', this.handleHashChange);
    window.addEventListener('beforeunload', () => this.currentPage?.remove());
    this.handleHashChange();
  }

  private readonly changePage = (getNewPage: () => AbstractComponent): void => {
    this.currentPage?.remove();
    const page = getNewPage();
    this.props.root.replaceChildren(page.node);
    this.currentPage = page;
  };

  private readonly handleHashChange = (): void => {
    const hash = globalThis.location.hash.replace(/#/, '');

    if (hash === '') {
      HashRouter.navigate();

      return;
    }

    this.changePage(this.props.routes[hash] ?? this.props.errorPage);
  };
}
