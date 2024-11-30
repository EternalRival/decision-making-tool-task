import type AbstractComponent from '~/core/models/abstract-component';
import Route from '~/core/models/route.enum';

type Props = {
  root: HTMLElement;
  routes: Record<string, () => AbstractComponent>;
  errorPage: () => AbstractComponent;
};

export default class HashRouter {
  private currentPage: AbstractComponent | null = null;

  constructor(private readonly props: Props) {}

  public static readonly navigate = (route = Route.HOME): void => {
    window.location.hash = route;
  };

  public initRouter(): void {
    window.addEventListener('hashchange', this.handleHashChange);
    window.addEventListener('beforeunload', () => this.currentPage?.remove());
    this.handleHashChange();
  }

  private readonly changePage = (page: AbstractComponent): void => {
    this.currentPage?.remove();
    this.props.root.replaceChildren(page.node);
    this.currentPage = page;
  };

  private readonly handleHashChange = (): void => {
    const hash = window.location.hash.replace(/#/, '');

    if (hash === '') {
      HashRouter.navigate();

      return;
    }

    const page = (this.props.routes[hash] ?? this.props.errorPage)();

    this.changePage(page);
  };
}
