import Component from '~/core/components/component';
import ListOfOptions from '~/modules/list-of-options1/views/list-of-options';
import styles from './home.module.css';

const HEADING_TEXT = 'Decision Making Tool';

export default class HomePage extends Component<'main'> {
  constructor() {
    super('main', { className: styles.main });

    this.mount();
  }

  private mount(): void {
    const heading = new Component('h1', { className: styles.heading, textContent: HEADING_TEXT, title: HEADING_TEXT });
    const listOfOptions = new ListOfOptions();

    this.replaceChildren(heading, listOfOptions);
  }
}
