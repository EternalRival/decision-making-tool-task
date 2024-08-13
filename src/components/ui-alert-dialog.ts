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

    this.append(errorMessage);
  }
}
