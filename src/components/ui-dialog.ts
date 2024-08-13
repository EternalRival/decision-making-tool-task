import { Button } from './button';
import { Component } from './component';
import styles from './ui-dialog.module.css';

export class UiDialog extends Component<'dialog'> {
  protected modalUnlock: () => void;
  protected modalLock: () => void;

  constructor() {
    super('dialog', {
      className: styles.uiDialog,
      onclick: (e) => {
        if (e.target === e.currentTarget) {
          this.remove();
        }
      },
      onkeydown: (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
        }
      },
    });

    const closeButton = new Button({
      className: styles.closeButton,
      textContent: '⨉',
      onclick: () => this.remove(),
    });

    this.append(closeButton);

    const modalRemove = () => {
      document.body.classList.remove('body-no-scroll');
      this.getNode().close();
      super.remove();
    };

    const setModalLock = (isEnabled: boolean) => {
      closeButton.toggleClass(styles.hidden, !isEnabled);
      this.toggleClass(styles.darkened, !isEnabled);
      this.remove = isEnabled ? modalRemove : () => {};
    };

    this.modalUnlock = () => setModalLock(true);
    this.modalLock = () => setModalLock(false);

    this.modalUnlock();
  }

  public render(root: HTMLElement) {
    root.append(this.getNode());
    this.getNode().showModal();
    document.body.classList.add('body-no-scroll');
  }
}
