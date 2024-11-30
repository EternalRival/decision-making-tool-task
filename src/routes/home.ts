import Component from '~/core/components/component';
import type AbstractComponent from '~/core/models/abstract-component';
import ListOfOptions from '~/modules/list-of-options/views/list-of-options';
import styles from './home.module.css';

const HEADING_TEXT = 'Decision Making Tool';

export default class HomePage extends Component<'main'> {
  private listOfOptions: AbstractComponent | null = null;

  constructor() {
    super('main', { className: styles.main });

    this.mount();
  }

  public override remove(): void {
    this.listOfOptions?.remove();
    super.remove();
  }

  private mount(): void {
    const heading = new Component('h1', { className: styles.heading, textContent: HEADING_TEXT, title: HEADING_TEXT });
    const listOfOptions = new ListOfOptions();

    this.replaceChildren(heading, listOfOptions);

    this.listOfOptions = listOfOptions;
  }
}
