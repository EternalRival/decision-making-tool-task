import clsx from 'clsx';
import Component from './component';
import styles from './ui-dialog1.module.css';

const FADE_IN = {
  keyframes: [
    { opacity: 0, pointerEvents: 'none' },
    { opacity: 1, pointerEvents: 'none' },
  ],
  options: { duration: 250, easing: 'ease-in-out' },
};

const FADE_OUT = {
  keyframes: [
    { opacity: 1, pointerEvents: 'none' },
    { opacity: 0, pointerEvents: 'none' },
  ],
  options: { duration: 150, easing: 'ease-in-out' },
};

type Props = ConstructorParameters<typeof Component<'dialog'>>[1];

type Keyframes = Keyframe[] | PropertyIndexedKeyframes | null;

type KeyframeOptions = KeyframeAnimationOptions;

export default class UiDialog extends Component<'dialog'> {
  constructor(props?: Props) {
    super('dialog', {
      ...props,
      className: clsx(styles.uiDialog, props?.className),
      onclick: async (event) => {
        if (event.target === event.currentTarget) {
          await props?.onclick?.call(this.getNode(), event);
          await this.closeDialog();
        }
      },
      oncancel: async (event) => {
        // todo
        void this;

        console.debug('cancel', event);
      },
      onclose: async (event) => {
        await props?.onclose?.call(this.getNode(), event);

        this.remove();
      },
    });
  }

  public static parseReturnMessage(event: Event): string {
    return event.target instanceof HTMLDialogElement && event.target.returnValue ? event.target.returnValue : 'cancel';
  }

  public async openDialog(): Promise<void> {
    document.body.append(this.getNode());
    this.getNode().showModal();
    await this.animateDialog(FADE_IN.keyframes, FADE_IN.options);
  }

  public async closeDialog(returnValue?: string): Promise<void> {
    await this.animateDialog(FADE_OUT.keyframes, FADE_OUT.options);
    this.getNode().close(returnValue);
  }

  private async animateDialog(keyframes: Keyframes, options?: KeyframeOptions): Promise<void> {
    const dialog = this.getNode();

    const animations = [
      dialog.animate(keyframes, options),
      dialog.animate(keyframes, { ...options, pseudoElement: '::backdrop' }),
    ];

    await Promise.all(animations.map(({ finished }) => finished));
  }
}
