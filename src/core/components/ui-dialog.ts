import Component from '~/core/components/component';
import styles from './ui-dialog.module.css';

export default class UiDialog extends Component<'dialog'> {
  private isModalLocked = false;

  constructor() {
    super('dialog', {
      className: styles.uiDialog,
      onclick: (event) => this.handleDialogClick(event),
      oncancel: () => this.handleDialogCancel(),
    });

    document.addEventListener('keydown', this.handleKeydown);
  }

  public override async remove(...args: Parameters<Component['remove']>): Promise<void> {
    if (this.isModalLocked) {
      return;
    }

    await this.closeDialog('cancel').catch(console.error);
    super.remove(...args);
    document.removeEventListener('keydown', this.handleKeydown);
  }

  public render(root: HTMLElement): this {
    root.append(this.getNode());
    this.openDialog().catch(console.error);

    return this;
  }

  protected setModalLock(value: boolean): void {
    this.isModalLocked = value;

    if ('darkened' in styles) {
      this.toggleClass(styles.darkened, value);
    }
  }

  private async openDialog(): Promise<void> {
    this.getNode().showModal();
  }

  private async closeDialog(returnValue?: string): Promise<void> {
    this.getNode().close(returnValue);
  }

  private handleDialogCancel(): void {
    this.remove().catch(console.error);
  }

  private handleDialogClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.remove().catch(console.error);
    }
  }

  private readonly handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.isModalLocked) {
      e.preventDefault();
    }
  };
}
