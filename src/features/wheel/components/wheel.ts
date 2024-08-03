import { Component } from '~/components/component';
import { TableRow } from '../types/table-row.type';
import { WheelSlice } from '../types/wheel-slice.type';
import { getSliceList } from '../utils/get-slice-list';

const CIRCLE = Math.PI * 2;

export class Wheel extends Component {
  private ctx: CanvasRenderingContext2D;

  private size: number;
  private rotation = 0;
  private sliceList: WheelSlice[];

  constructor({ size = 512, table }: { size?: number; table: TableRow[] }) {
    super('div');

    const canvas = new Component('canvas', { width: size, height: size, textContent: 'wheel of fortune' });
    const ctx = canvas.getNode().getContext('2d');

    if (!ctx) throw new Error();

    this.ctx = ctx;
    this.size = size;
    this.sliceList = getSliceList(table);

    this.drawWheel();

    this.append(canvas);

    this.spin({ duration: 5, targetRotationOffset: CIRCLE / Math.random() });
  }

  private spin({ duration, targetRotationOffset }: { duration: number; targetRotationOffset: number }): void {
    const fullSpinsRotation = duration * CIRCLE;
    const targetRotation = fullSpinsRotation + targetRotationOffset;

    const start = performance.now();

    const fn: FrameRequestCallback = (time) => {
      const progress = Math.min((time - start) / (duration * 1000), 1);
      const easedProgress = progress < 0.5 ? 4 * progress ** 3 : 4 * (progress - 1) ** 3 + 1;

      const rot = easedProgress * targetRotation - this.rotation;

      this.adjustRotation(rot);
      this.drawWheel();

      if (progress < 1) {
        requestAnimationFrame(fn);
      }
    };

    requestAnimationFrame(fn);
  }

  private adjustRotation(offset: number): void {
    this.rotation += offset;
  }

  private drawShadow({ center, wheelRadius, padding }: { center: number; wheelRadius: number; padding: number }): void {
    const { ctx } = this;

    ctx.save();

    const shadowPath = new Path2D();
    shadowPath.arc(center, center, wheelRadius, 0, CIRCLE);
    ctx.shadowColor = '#000';
    ctx.shadowBlur = padding;
    ctx.fill(shadowPath);
    ctx.fill(shadowPath);

    ctx.restore();
  }

  private drawSlice({ center, wheelRadius, slice }: { center: number; wheelRadius: number; slice: WheelSlice }): void {
    const { ctx } = this;
    const { startAngle, endAngle, color } = slice;

    ctx.save();

    const slicePath = new Path2D();
    slicePath.moveTo(center, center);
    slicePath.arc(center, center, wheelRadius, startAngle + this.rotation, endAngle + this.rotation);
    slicePath.lineTo(center, center);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = color;

    ctx.fill(slicePath);
    ctx.stroke(slicePath);

    ctx.restore();
  }

  private drawSliceText({
    center,
    wheelRadius,
    centerCircleRadius,
    fontSize,
    slice,
  }: {
    center: number;
    wheelRadius: number;
    centerCircleRadius: number;
    fontSize: number;
    slice: WheelSlice;
  }): void {
    const { ctx } = this;
    const { startAngle, endAngle, label } = slice;

    ctx.save();

    if (endAngle - startAngle > 0.25) {
      ctx.translate(center, center);
      ctx.rotate(startAngle + (endAngle - startAngle) / 2 + this.rotation);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${fontSize}px sans-serif`;

      ctx.lineWidth = fontSize / 8;
      ctx.strokeStyle = '#000';
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#00000080';
      ctx.shadowBlur = fontSize / 2;

      const text = this.normalizeText(label, wheelRadius - centerCircleRadius * 2);

      ctx.strokeText(text, (wheelRadius + centerCircleRadius) / 2, 0);
      ctx.fillText(text, (wheelRadius + centerCircleRadius) / 2, 0);
    }

    ctx.restore();
  }

  private normalizeText(text: string, maxWidth: number): string {
    const { actualBoundingBoxLeft, actualBoundingBoxRight } = this.ctx.measureText(text);

    if (actualBoundingBoxRight + actualBoundingBoxLeft < maxWidth) {
      return text;
    }

    return this.normalizeText(`${text.slice(0, -2)}…`, maxWidth);
  }

  private drawCenterCircle({
    center,
    centerCircleRadius,
    color,
  }: {
    center: number;
    centerCircleRadius: number;
    color: string;
  }): void {
    const { ctx } = this;

    ctx.save();

    const centerPath = new Path2D();
    centerPath.arc(center, center, centerCircleRadius, 0, CIRCLE);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = color;
    ctx.fill(centerPath);
    ctx.stroke(centerPath);

    ctx.restore();
  }

  private drawWheel(): void {
    const { ctx, size, sliceList } = this;
    const center = size / 2;
    const padding = size / 32;
    const fontSize = size / 32;
    const wheelRadius = center - padding;
    const centerCircleRadius = wheelRadius / 8;

    ctx.clearRect(0, 0, size, size);

    this.drawShadow({ center, wheelRadius, padding });

    sliceList.forEach((slice) => {
      this.drawSlice({ center, wheelRadius, slice });
      this.drawSliceText({ center, wheelRadius, centerCircleRadius, fontSize, slice });
    });

    this.drawCenterCircle({ center, centerCircleRadius, color: '#008c8c' });
  }
}
