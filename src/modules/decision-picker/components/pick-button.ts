import SpriteIcon from '~/core/components/sprite-icon';
import UiButton from '~/core/components/ui-button';
import styles from './pick-button.module.css';

const PICK_BUTTON_TEXT = 'Pick';

export default class PickButton extends UiButton {
  constructor() {
    super({
      className: styles.pickButton,
      title: PICK_BUTTON_TEXT,
      ariaLabel: PICK_BUTTON_TEXT,
    });

    this.mount();
  }

  private mount(): void {
    const playIcon = SpriteIcon({ name: 'play' });

    this.replaceChildren(playIcon);
  }
}
