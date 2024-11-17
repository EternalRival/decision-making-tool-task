import Button from '~/core/components/button';
import Component from '~/core/components/component';
import UiDialog from '~/core/components/ui-dialog';
import styles from './ui-alert-dialog.module.css';

export default class UiAlertDialog extends UiDialog {
  constructor({ alertText }: { alertText: string }) {
    super();

    const errorMessage = new Component('p', {
      className: styles['errorMessage'],
      textContent: alertText,
    });

    const closeButton = new Button({
      className: styles['closeButton'],
      textContent: '⨉',
      onclick: (): void => {
        this.remove().catch(console.error);
      },
    });

    this.append(closeButton, errorMessage);
  }
}
