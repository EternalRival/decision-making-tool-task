import { Component } from '~/components/component';
import { TableRow } from '../types/table-row.type';
import { WheelSlice } from '../types/wheel-slice.type';
import { animate } from '../utils/animate';
import { drawWheel } from '../utils/draw-wheel';
import { easeInOut } from '../utils/ease-in-out';
import { getSliceList } from '../utils/get-slice-list';

export class Wheel extends Component {
  private ctx: CanvasRenderingContext2D;
  private size: number;
  private rotation: number;
  private sliceList: WheelSlice[];
  private renderSelected: () => void;

  constructor({ size = 512, table }: { size?: number; table: TableRow[] }) {
    super('div');

    this.size = size;
    this.sliceList = getSliceList(table);
    this.rotation = 0;

    const selected = new Component('p', { textContent: this.rotation.toString() });
    const canvas = new Component('canvas', { width: size, height: size, textContent: 'wheel of fortune' });
    const startButton = new Component('button', {
      textContent: 'spin',
      onclick: () => this.spin({ duration: 5, targetRotationOffset: Math.PI * 2 * Math.random() }),
    });
    const ctx = canvas.getNode().getContext('2d');

    if (!ctx) throw new Error();

    this.ctx = ctx;
    this.renderSelected = () => selected.setTextContent(this.getCurrentSliceLabel());

    drawWheel({ ctx, size, rotation: this.rotation, sliceList: this.sliceList });

    this.append(startButton, selected, canvas);
  }

  private spin({ duration, targetRotationOffset }: { duration: number; targetRotationOffset: number }): void {
    const fullSpinsRotation = duration * Math.PI * 2;
    const targetRotation = fullSpinsRotation + targetRotationOffset;

    const drawFn = (progress: number) => {
      this.renderWheel(progress * targetRotation);
    };

    const onFinish = () => {
      this.renderWheel(targetRotationOffset);
    };

    animate({ duration, drawFn, easingFn: easeInOut, onFinish });
  }

  private setRotation(offset: number): void {
    this.rotation = offset;
  }

  private getCurrentSliceLabel(): string {
    return this.rotation.toString();
  }

  private renderWheel(newRotation: number): void {
    this.setRotation(newRotation);
    this.renderSelected();

    drawWheel({
      ctx: this.ctx,
      rotation: this.rotation,
      size: this.size,
      sliceList: this.sliceList,
    });
  }
}
