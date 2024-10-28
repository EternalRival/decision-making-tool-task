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
    });

    document.addEventListener('keydown', this.handleKeydown);
  }

  public override remove(...args: Parameters<Component['remove']>): void {
    if (this.isModalLocked) {
      return;
    }

    this.getNode().close();
    super.remove(...args);
    document.removeEventListener('keydown', this.handleKeydown);
  }

  public render(root: HTMLElement): this {
    root.append(this.getNode());
    this.getNode().showModal();

    return this;
  }

  protected setModalLock(value: boolean): void {
    this.isModalLocked = value;

    if (styles['darkened']) {
      this.toggleClass(styles['darkened'], value);
    }
  }

  private readonly handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.isModalLocked) {
      e.preventDefault();
    }
  };
}
