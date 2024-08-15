import { Button } from '~/components/button';
import { Component } from '~/components/component';
import styles from './ui-alert-dialog.module.css';
import { UiDialog } from './ui-dialog';

export class UiAlertDialog extends UiDialog {
  constructor({ alertText }: { alertText: string }) {
    super();

    const errorMessage = new Component('p', {
      className: styles.errorMessage,
      textContent: alertText,
    });

    const closeButton = new Button({
      className: styles.closeButton,
      textContent: '⨉',
      onclick: () => this.remove(),
    });

    this.append(closeButton, errorMessage);
  }
}
