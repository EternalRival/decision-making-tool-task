import Button from '~/core/components/button';
import Component from '~/core/components/component';
import Input from '~/core/components/input';
import UiButton from '~/core/components/ui-button';
import UiDialog from '~/core/components/ui-dialog';
import { CIRCLE } from '../models/constants';
import type { TableRow } from '../models/table-row.type';
import MuteStateService from '../services/mute-state.service';
import WheelCanvasService from '../services/wheel-canvas.service';
import WheelLotsService from '../services/wheel-lots.service';
import WheelRotationService from '../services/wheel-rotation.service';
import animate from '../utils/animate';
import easeInOut from '../utils/ease-in-out';
import SpriteIcon from '../../../core/components/sprite-icon';
import playWinningSound from '../utils/play-winning-sound';
import styles from './decision-picker.module.css';

const CANVAS_TEXT = 'Decision Picker Wheel';
const PICK_BUTTON_TEXT = 'Pick';
const DURATION_MIN_VALUE = '5';
const DURATION_INITIAL_VALUE = '16';
const DURATION_PLACEHOLDER_TEXT = 'sec';

export default class DecisionPicker extends UiDialog {
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

  public override async remove(): Promise<void> {
    await super.remove({
      onRemove: (): void => {
        this.muteStateService.destroy();
        this.wheelRotationService.destroy();
      },
    });
  }

  private renderUI(): void {
    const getSoundButtonIcon = (): SVGSVGElement => SpriteIcon({ name: this.muteStateService.get() ? 'off' : 'on' });
    const getSelectedTitle = (): string => this.wheelLotsService.getTitleByRadian(this.wheelRotationService.get());

    const header = new Component('header', { className: styles.header });
    const container = new Component('div', { className: styles.container });

    const closeButton = new Button({ className: styles.closeButton });
    closeButton.setSVGIcon(SpriteIcon({ name: 'x' }));
    const soundButton = new Button({ className: styles.soundButton });
    soundButton.setSVGIcon(getSoundButtonIcon());

    const pickForm = new Component('form', { className: styles.pickForm });
    const pickedOption = new Component('p', {
      className: styles.pickedOption,
      textContent: getSelectedTitle(),
    });

    const canvas = new Component('canvas', {
      className: styles.canvas,
      width: this.size,
      height: this.size,
      textContent: CANVAS_TEXT,
    });

    const pickButton = new UiButton({
      className: styles.pickButton,
      type: 'submit',
      textContent: PICK_BUTTON_TEXT,
      autofocus: true,
    });
    const durationLabel = new Component('label', { className: styles.durationLabel, textContent: 'Duration:' });
    const durationInput = new Input({
      className: styles.durationInput,
      type: 'number',
      min: DURATION_MIN_VALUE,
      value: DURATION_INITIAL_VALUE,
      placeholder: DURATION_PLACEHOLDER_TEXT,
      required: true,
    });

    closeButton.getNode().addEventListener('click', () => {
      this.remove().catch(console.error);
    });
    soundButton.getNode().addEventListener('click', () => {
      this.muteStateService.toggle();
      soundButton.setSVGIcon(getSoundButtonIcon());
    });

    pickForm.getNode().addEventListener('submit', (event) => {
      event.preventDefault();

      pickButton.toggleDisabled(true);
      durationInput.setDisabled(true);
      this.setModalLock(true);
      header.toggleInert(true);

      if ('picked' in styles) {
        pickedOption.removeClass(styles.picked);
      }

      this.startPicking({
        duration: Number(durationInput.getValue()),
        targetRotationOffset: CIRCLE * Math.random(),
        onFinish: () => {
          pickButton.toggleDisabled(false);
          durationInput.setDisabled(false);
          this.setModalLock(false);
          header.toggleInert(false);

          if ('picked' in styles) {
            pickedOption.addClass(styles.picked);
          }

          if (!this.muteStateService.get()) {
            playWinningSound().catch((error: unknown) => {
              console.error(error);
            });
          }
        },
      });
    });

    this.wheelRotationService.on(() => pickedOption.setTextContent(getSelectedTitle()));
    this.wheelCanvasService.init({ canvas: canvas.getNode() }).draw({
      rotation: this.wheelRotationService.get(),
      size: this.size,
      sliceList: this.wheelLotsService.getSliceList(),
    });

    this.append(header, container);
    header.append(closeButton, soundButton);
    container.append(pickForm, pickedOption, canvas);
    pickForm.append(pickButton, durationLabel);
    durationLabel.append(durationInput);
  }

  private startPicking({
    duration,
    targetRotationOffset,
    onFinish,
  }: {
    duration: number;
    targetRotationOffset: number;
    onFinish: () => void;
  }): void {
    const fullTurnsRotation = duration * CIRCLE;
    const targetRotation = fullTurnsRotation + targetRotationOffset;

    const drawFn = (progress: number): void => {
      this.wheelRotationService.set(progress * targetRotation);
      this.wheelCanvasService.draw({
        rotation: this.wheelRotationService.get(),
        size: this.size,
        sliceList: this.wheelLotsService.getSliceList(),
      });
    };

    const onPicked = (): void => {
      this.wheelRotationService.set(targetRotationOffset);
      this.wheelCanvasService.draw({
        rotation: this.wheelRotationService.get(),
        size: this.size,
        sliceList: this.wheelLotsService.getSliceList(),
      });

      onFinish();
    };

    animate({ duration, drawFn, easingFn: easeInOut, onFinish: onPicked });
  }
}
