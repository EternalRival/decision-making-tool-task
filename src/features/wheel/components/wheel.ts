import { Button } from '~/components/button';
import { Component } from '~/components/component';
import { Input } from '~/components/input';
import { UiButton } from '~/components/ui-button';
import { UiDialog } from '~/components/ui-dialog';
import { type TableRow } from '../types/table-row.type';
import { type WheelSlice } from '../types/wheel-slice.type';
import { animate } from '../utils/animate';
import { drawWheel } from '../utils/draw-wheel';
import { easeInOut } from '../utils/ease-in-out';
import { getSliceList } from '../utils/get-slice-list';
import styles from './wheel.module.css';

export class Wheel extends UiDialog {
  private ctx: CanvasRenderingContext2D;
  private size: number;
  private rotation: number;
  private sliceList: WheelSlice[];
  private renderSelected: () => void;

  constructor({ size = 512, table }: { size?: number; table: TableRow[] }) {
    super();

    this.size = size;
    this.sliceList = getSliceList(table);
    this.rotation = 0;

    const handleStartSpin = ({
      selected,
      spinButton,
      durationInput,
    }: {
      selected: Component<'p'>;
      spinButton: Button;
      durationInput: Input;
    }) => {
      spinButton.setDisabled(true);
      durationInput.setDisabled(true);
      this.modalLock();
      selected.removeClass(styles.winner);

      this.spin({
        duration: Number(durationInput.getValue()),
        targetRotationOffset: Math.PI * 2 * Math.random(),
        onFinish: () => {
          spinButton.setDisabled(false);
          durationInput.setDisabled(false);
          this.modalUnlock();
          selected.addClass(styles.winner);
        },
      });
    };

    const container = new Component('div', { className: styles.container });
    const selected = new Component('p', { className: styles.selected, textContent: this.getCurrentSliceTitle() });
    const canvas = new Component('canvas', {
      className: styles.canvas,
      width: size,
      height: size,
      textContent: 'wheel of fortune',
    });

    const spinButton = new UiButton({
      className: styles.spinButton,
      type: 'submit',
      textContent: 'Spin',
      autofocus: true,
    });
    const durationLabel = new Component('label', { className: styles.durationLabel, textContent: 'Duration:' });
    const durationInput = new Input({
      className: styles.durationInput,
      type: 'number',
      min: '5',
      value: '20',
      placeholder: 'sec',
      required: true,
    });
    const spinForm = new Component('form', {
      className: styles.spinForm,
      onsubmit: (e) => {
        e.preventDefault();
        handleStartSpin({ selected, spinButton, durationInput });
      },
    });

    const ctx = canvas.getNode().getContext('2d');

    if (!ctx) throw new Error();

    this.ctx = ctx;
    this.renderSelected = () => selected.setTextContent(this.getCurrentSliceTitle());

    this.renderWheel();

    durationLabel.append(durationInput);
    spinForm.append(spinButton, durationLabel);
    container.append(spinForm, selected, canvas);
    this.append(container);
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
    const fullSpinsRotation = duration * Math.PI * 2;
    const targetRotation = fullSpinsRotation + targetRotationOffset;

    const drawFn = (progress: number) => {
      this.renderWheel(progress * targetRotation);
    };

    const onSpinFinish = () => {
      this.renderWheel(targetRotationOffset);
      onFinish();
    };

    animate({ duration, drawFn, easingFn: easeInOut, onFinish: onSpinFinish });
  }

  private setRotation(offset: number): void {
    this.rotation = offset;
  }

  private getCurrentSliceTitle(): string {
    const circle = Math.PI * 2;

    const rotation = circle - (this.rotation % circle);

    const isCurrentSlice = (slice: WheelSlice) => slice.startAngle <= rotation && slice.endAngle > rotation;

    return (this.sliceList.find(isCurrentSlice) ?? this.sliceList[0]).title;
  }

  private withRotationOffset(angle: number): number {
    return angle + Math.PI * 1.5;
  }

  private renderWheel(newRotation: number = this.rotation): void {
    this.setRotation(newRotation);
    this.renderSelected();

    drawWheel({
      ctx: this.ctx,
      rotation: this.withRotationOffset(this.rotation),
      size: this.size,
      sliceList: this.sliceList,
    });
  }
}
