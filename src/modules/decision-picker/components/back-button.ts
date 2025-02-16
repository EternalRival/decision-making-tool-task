import SpriteIcon from '~/core/components/sprite-icon';
import UiButton from '~/core/components/ui-button';
import Route from '~/core/models/route.enum';
import HashRouter from '~/core/router/hash-router';
import styles from './back-button.module.css';

const BACK_BUTTON_TEXT = 'Back';

export default class BackButton extends UiButton {
  constructor() {
    super({
      type: 'button',
      className: styles.backButton,
      title: BACK_BUTTON_TEXT,
      ariaLabel: BACK_BUTTON_TEXT,
      onclick: () => {
        HashRouter.navigate(Route.HOME);
      },
    });

    this.mount();
  }

  private mount(): void {
    const icon = SpriteIcon({ name: 'undo-2' });

    this.replaceChildren(icon);
  }
}
