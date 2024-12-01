import AbstractComponent from '~/core/models/abstract-component';
import BackButton from './back-button';
import styles from './control-panel-form.module.css';
import DurationInput from './duration-input';
import PickButton from './pick-button';
import ToggleSoundCheckbox from './toggle-sound-checkbox';

export default class ControlPanelForm extends AbstractComponent {
  constructor() {
    super('form', { className: styles.form });

    this.mount();
  }

  private mount(): void {
    const backButton = new BackButton();
    const soundCheckbox = new ToggleSoundCheckbox({ name: 'sound', defaultChecked: true });
    const durationInput = new DurationInput({ name: 'duration' });
    const pickButton = new PickButton();

    const toggleDisabledFormElements = (value?: boolean): void =>
      [backButton, soundCheckbox, durationInput, pickButton].forEach((component) => component.toggleDisabled(value));

    this.node.addEventListener('submit', (event) => {
      event.preventDefault();

      toggleDisabledFormElements(true);
      console.debug('submit');
    });

    this.replaceChildren(backButton, soundCheckbox, durationInput, pickButton);
  }
}
