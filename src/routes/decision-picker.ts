import Component from '~/core/components/component';
import DecisionPicker from '~/modules/decision-picker/views/decision-picker';
import styles from './decision-picker.module.css';

const HEADING_TEXT = 'Decision Making Tool';

export default class DecisionPickerPage extends Component<'main'> {
  constructor() {
    super('main', { className: styles.main });

    this.mount();
  }

  private mount(): void {
    const heading = new Component('h1', { className: styles.heading, textContent: HEADING_TEXT, title: HEADING_TEXT });
    const decisionPicker = new DecisionPicker();

    this.replaceChildren(heading, decisionPicker);
  }
}
