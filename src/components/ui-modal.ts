import { Button } from '~/components/button';
import { Component } from '~/components/component';
import styles from './ui-modal.module.css';

export class UiModal extends Component {
  protected enableModalClose: () => void;
  protected disableModalClose: () => void;

  constructor() {
    super('div', {
      className: styles.wrapper,
      onclick: (e) => {
        if (e.target === e.currentTarget) {
          this.remove();
        }
      },
    });

    const container = new Component('div', { className: styles.container });

    const closeButton = new Button({
      className: styles.closeButton,
      textContent: '⨉',
      onclick: () => this.remove(),
    });

    container.append(closeButton);
    this.append(container);

    const modalAppend = (...children: Parameters<typeof this.append>) => {
      children.forEach((child) => container.append(child));
    };

    const modalRemove = () => {
      super.remove();
      document.body.classList.remove('body-no-scroll');
    };

    this.append = modalAppend;

    const setModalCloseEnabled = (isEnabled: boolean) => {
      closeButton.toggleClass(styles.hidden, !isEnabled);
      this.toggleClass(styles.darkened, !isEnabled);
      this.remove = isEnabled ? modalRemove : () => {};
    };

    this.enableModalClose = () => setModalCloseEnabled(true);
    this.disableModalClose = () => setModalCloseEnabled(false);

    this.enableModalClose();
  }

  public render(root: HTMLElement) {
    root.append(this.getNode());
    document.body.classList.add('body-no-scroll');
  }
}
