import { Component } from '~/components/component';
import styles from './ui-alert-modal.module.css';
import { UiModal } from './ui-modal';

export class UiAlertModal extends UiModal {
  constructor({ alertText }: { alertText: string }) {
    super();

    const errorMessage = new Component('p', {
      className: styles.errorMessage,
      textContent: alertText,
    });

    this.append(errorMessage);
  }
}
