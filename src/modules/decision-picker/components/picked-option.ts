import AbstractComponent from '~/core/models/abstract-component';
import styles from './picked-option.module.css';

const PICKED_OPTION_INITIAL_TEXT = 'Press start button'.toUpperCase();

export default class PickedOption extends AbstractComponent<'p'> {
  constructor() {
    super('p', { className: styles.pickedOption, textContent: PICKED_OPTION_INITIAL_TEXT });
  }

  public setTextContent(value: typeof this.node.textContent): void {
    this.node.textContent = value;
  }

  public togglePickedState(force?: boolean): void {
    if ('picked' in styles) {
      this.node.classList.toggle(styles.picked, force);
    }
  }
}
