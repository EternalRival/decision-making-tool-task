import Component from './component';
import styles from './ui-dialog.module.css';

export default class UiDialog extends Component<'dialog'> {
  private isModalLocked = false;

  constructor() {
    super('dialog', {
      className: styles['uiDialog'],
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
  }

  protected setModalLock(value: boolean): void {
    this.isModalLocked = value;

    if (styles['darkened']) {
      this.toggleClass(styles['darkened'], value);
    }
  }

  public override remove(): void {
    if (this.isModalLocked) {
      return;
    }

    this.getNode().close();
    super.remove();
  }

  public render(root: HTMLElement): this {
    root.append(this.getNode());
    this.getNode().showModal();

    return this;
  }
}
