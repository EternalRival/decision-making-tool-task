import { Component } from '~/components/component';
import { TableRow } from '../types/table-row.type';
import { WheelSlice } from '../types/wheel-slice.type';
import { getSliceList } from '../utils/get-slice-list';

const CIRCLE = Math.PI * 2;

export class Wheel extends Component {
  private ctx: CanvasRenderingContext2D;

  constructor({ size = 512, table }: { size?: number; table: TableRow[] }) {
    super('div');

    const canvas = new Component('canvas', { width: size, height: size, textContent: 'wheel of fortune' });
    const ctx = canvas.getNode().getContext('2d');

    if (!ctx) throw new Error();

    this.ctx = ctx;

    const sliceList = getSliceList(table);
    this.drawWheel({ size, sliceList });

    this.append(canvas);
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

  private drawSlice({
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
    const { startAngle, endAngle, color, label } = slice;

    ctx.save();

    const slicePath = new Path2D();
    slicePath.moveTo(center, center);
    slicePath.arc(center, center, wheelRadius, startAngle, endAngle);
    slicePath.lineTo(center, center);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = color;

    ctx.fill(slicePath);
    ctx.stroke(slicePath);

    if (endAngle - startAngle > 0.25) {
      ctx.translate(center, center);
      ctx.rotate(endAngle - (endAngle - startAngle) / 2);

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

  private drawWheel({ size, sliceList }: { size: number; sliceList: WheelSlice[] }): void {
    const center = size / 2;
    const padding = size / 32;
    const fontSize = size / 32;
    const wheelRadius = center - padding;
    const centerCircleRadius = wheelRadius / 8;

    this.drawShadow({ center, wheelRadius, padding });

    sliceList.forEach((slice) => this.drawSlice({ center, wheelRadius, centerCircleRadius, fontSize, slice }));

    this.drawCenterCircle({ center, centerCircleRadius, color: 'teal' });
  }
}
