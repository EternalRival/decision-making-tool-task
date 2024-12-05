import Component from '~/core/components/component';
import UiButton from '~/core/components/ui-button';
import UiDialog from '~/core/components/ui-dialog';
import styles from './warning-modal.module.css';

const WARNING_TEXT = `Please add at least 2 valid options.

An option is considered valid if its title is not empty and its weight is greater than 0`;

const CLOSE_BUTTON_TEXT = 'Close';

export default class WarningModal extends UiDialog {
  constructor() {
    super();

    this.mount();
  }

  private mount(): void {
    const container = new Component('div', { className: styles.container });
    const warning = new Component('p', { className: styles.warning, innerText: WARNING_TEXT });
    const closeButton = new UiButton({
      className: styles.closeButton,
      textContent: CLOSE_BUTTON_TEXT,
      onclick: (): void => void this.closeDialog('Cancel'),
    });

    container.append(warning, closeButton);
    this.append(container);
  }
}
