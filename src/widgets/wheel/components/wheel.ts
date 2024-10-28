import Button from '~/components/button';
import Component from '~/components/component';
import Input from '~/components/input';
import UiButton from '~/components/ui-button';
import UiDialog from '~/components/ui-dialog';
import { CIRCLE } from '../model/constants';
import MuteStateService from '../services/mute-state.service';
import WheelCanvasService from '../services/wheel-canvas.service';
import WheelLotsService from '../services/wheel-lots.service';
import WheelRotationService from '../services/wheel-rotation.service';
import type { TableRow } from '../types/table-row.type';
import animate from '../utils/animate';
import easeInOut from '../utils/ease-in-out';
import getSoundIcon from '../utils/get-sound-icon';
import playWinningSound from '../utils/play-winning-sound';
import styles from './wheel.module.css';

export default class Wheel extends UiDialog {
  private readonly size: number;

  private readonly muteStateService: MuteStateService;

  private readonly wheelRotationService: WheelRotationService;

  private readonly wheelLotsService: WheelLotsService;

  private readonly wheelCanvasService: WheelCanvasService;

  constructor({ size = 512, table }: { size?: number; table: TableRow[] }) {
    super();

    this.size = size;
    this.muteStateService = new MuteStateService();
    this.wheelCanvasService = new WheelCanvasService();
    this.wheelLotsService = new WheelLotsService({ table });
    this.wheelRotationService = new WheelRotationService();

    this.renderUI();

    this.muteStateService.init();
  }

  public override remove(): void {
    super.remove({
      onRemove: (): void => {
        this.muteStateService.destroy();
        this.wheelRotationService.destroy();
      },
    });
  }

  private renderUI(): void {
    const getSoundButtonIcon = (): string => getSoundIcon({ name: this.muteStateService.get() ? 'off' : 'on' });
    const getSelectedTitle = (): string => this.wheelLotsService.getTitleByRadian(this.wheelRotationService.get());

    const header = new Component('header', { className: styles['header'] });
    const container = new Component('div', { className: styles['container'] });

    const closeButton = new Button({ className: styles['closeButton'], textContent: '⨉' });
    const soundButton = new Button({ className: styles['soundButton'] });
    soundButton.setSVGIcon(getSoundButtonIcon());

    const spinForm = new Component('form', { className: styles['spinForm'] });
    const selected = new Component('p', {
      className: styles['selected'],
      textContent: getSelectedTitle(),
    });

    const canvas = new Component('canvas', {
      className: styles['canvas'],
      width: this.size,
      height: this.size,
      textContent: 'Wheel of Fortune',
    });

    const spinButton = new UiButton({
      className: styles['spinButton'],
      type: 'submit',
      textContent: 'Spin',
      autofocus: true,
    });
    const durationLabel = new Component('label', { className: styles['durationLabel'], textContent: 'Duration:' });
    const durationInput = new Input({
      className: styles['durationInput'],
      type: 'number',
      min: '5',
      value: '20',
      placeholder: 'sec',
      required: true,
    });

    closeButton.getNode().addEventListener('click', () => {
      this.remove();
    });
    soundButton.getNode().addEventListener('click', () => {
      this.muteStateService.toggle();
      soundButton.setSVGIcon(getSoundButtonIcon());
    });

    spinForm.getNode().addEventListener('submit', (event) => {
      event.preventDefault();

      spinButton.toggleDisabled(true);
      durationInput.setDisabled(true);
      this.setModalLock(true);
      if (styles['hidden']) {
        header.addClass(styles['hidden']);
      }
      if (styles['winner']) {
        selected.removeClass(styles['winner']);
      }

      this.spin({
        duration: Number(durationInput.getValue()),
        targetRotationOffset: CIRCLE * Math.random(),
        onFinish: () => {
          spinButton.toggleDisabled(false);
          durationInput.setDisabled(false);
          this.setModalLock(false);
          if (styles['hidden']) {
            header.removeClass(styles['hidden']);
          }
          if (styles['winner']) {
            selected.addClass(styles['winner']);
          }

          if (!this.muteStateService.get()) {
            playWinningSound().catch((error: unknown) => {
              console.error(error);
            });
          }
        },
      });
    });

    this.wheelRotationService.on(() => selected.setTextContent(getSelectedTitle()));
    this.wheelCanvasService.init({ canvas: canvas.getNode() }).draw({
      rotation: this.wheelRotationService.get(),
      size: this.size,
      sliceList: this.wheelLotsService.getSliceList(),
    });

    this.append(header, container);
    header.append(closeButton, soundButton);
    container.append(spinForm, selected, canvas);
    spinForm.append(spinButton, durationLabel);
    durationLabel.append(durationInput);
  }

  private spin({
    duration,
    targetRotationOffset,
    onFinish,
  }: {
    duration: number;
    targetRotationOffset: number;
    onFinish: () => void;
  }): void {
    const fullSpinsRotation = duration * CIRCLE;
    const targetRotation = fullSpinsRotation + targetRotationOffset;

    const drawFn = (progress: number): void => {
      this.wheelRotationService.set(progress * targetRotation);
      this.wheelCanvasService.draw({
        rotation: this.wheelRotationService.get(),
        size: this.size,
        sliceList: this.wheelLotsService.getSliceList(),
      });
    };

    const onSpinFinish = (): void => {
      this.wheelRotationService.set(targetRotationOffset);
      this.wheelCanvasService.draw({
        rotation: this.wheelRotationService.get(),
        size: this.size,
        sliceList: this.wheelLotsService.getSliceList(),
      });

      onFinish();
    };

    animate({ duration, drawFn, easingFn: easeInOut, onFinish: onSpinFinish });
  }
}
