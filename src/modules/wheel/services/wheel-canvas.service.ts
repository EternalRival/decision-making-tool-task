import { CIRCLE } from '../models/constants';
import type { WheelSlice } from '../models/wheel-slice.type';
import clipCanvasText from '../utils/clip-canvas-text';

export default class WheelCanvasService {
  private _ctx: CanvasRenderingContext2D | null = null;

  private get ctx(): CanvasRenderingContext2D {
    if (!this._ctx) {
      throw new Error('Canvas context is not initialized');
    }

    return this._ctx;
  }

  public init({ canvas }: { canvas: HTMLCanvasElement }): this {
    this._ctx = canvas.getContext('2d');

    return this;
  }

  public draw({
    size,
    rotation: baseRotation,
    sliceList,
    centerCircleColor = '#008c8c',
    cursorColor = '#008c8c',
  }: {
    size: number;
    rotation: number;
    sliceList: readonly WheelSlice[];
    centerCircleColor?: string;
    cursorColor?: string;
  }): void {
    const { ctx } = this;
    const center = size / 2;
    const padding = size / 32;
    const fontSize = size / 32;
    const wheelRadius = center - padding;
    const centerCircleRadius = wheelRadius / 8;
    const rotation = (baseRotation + CIRCLE * 0.75) % CIRCLE;

    ctx.clearRect(0, 0, size, size);

    this.drawShadow({ ctx, center, wheelRadius, padding })
      .drawSliceList({ ctx, center, wheelRadius, centerCircleRadius, rotation, fontSize, sliceList })
      .drawCenterCircle({ ctx, center, centerCircleRadius, color: centerCircleColor })
      .drawCursor({ ctx, center, padding, color: cursorColor });
  }

  private drawShadow({
    ctx,
    center,
    wheelRadius,
    padding,
  }: {
    ctx: CanvasRenderingContext2D;
    center: number;
    wheelRadius: number;
    padding: number;
  }): this {
    ctx.save();

    const path = new Path2D();
    path.arc(center, center, wheelRadius, 0, CIRCLE);

    Object.assign(ctx, { shadowColor: '#000', shadowBlur: padding });

    ctx.fill(path);
    ctx.fill(path);

    ctx.restore();

    return this;
  }

  private drawSlice({
    ctx,
    center,
    wheelRadius,
    rotation,
    slice,
  }: {
    ctx: CanvasRenderingContext2D;
    center: number;
    wheelRadius: number;
    rotation: number;
    slice: WheelSlice;
  }): this {
    const { startAngle, endAngle, color } = slice;

    ctx.save();

    const path = new Path2D();
    path.moveTo(center, center);
    path.arc(center, center, wheelRadius, startAngle + rotation, endAngle + rotation);
    path.lineTo(center, center);

    Object.assign(ctx, { lineWidth: 2, strokeStyle: '#fff', fillStyle: color });

    ctx.fill(path);
    ctx.stroke(path);

    ctx.restore();

    return this;
  }

  private drawSliceText({
    ctx,
    center,
    wheelRadius,
    centerCircleRadius,
    rotation,
    fontSize,
    slice,
  }: {
    ctx: CanvasRenderingContext2D;
    center: number;
    wheelRadius: number;
    centerCircleRadius: number;
    rotation: number;
    fontSize: number;
    slice: WheelSlice;
  }): this {
    const { startAngle, endAngle, title } = slice;

    ctx.save();

    if (endAngle - startAngle > 0.25) {
      ctx.translate(center, center);
      ctx.rotate(startAngle + (endAngle - startAngle) / 2 + rotation);

      Object.assign(ctx, {
        textAlign: 'center',
        textBaseline: 'middle',
        font: `${fontSize.toString()}px Inter`,
        lineWidth: fontSize / 8,
        strokeStyle: '#000',
        fillStyle: '#fff',
        shadowColor: '#00000080',
        shadowBlur: fontSize / 2,
      });

      const text = clipCanvasText(ctx, title, wheelRadius - centerCircleRadius * 2.5);

      ctx.strokeText(text, (wheelRadius + centerCircleRadius) / 2, 0);
      ctx.fillText(text, (wheelRadius + centerCircleRadius) / 2, 0);
    }

    ctx.restore();

    return this;
  }

  private drawSliceList({
    ctx,
    center,
    wheelRadius,
    centerCircleRadius,
    rotation,
    fontSize,
    sliceList,
  }: {
    ctx: CanvasRenderingContext2D;
    center: number;
    wheelRadius: number;
    centerCircleRadius: number;
    rotation: number;
    fontSize: number;
    sliceList: readonly WheelSlice[];
  }): this {
    sliceList.forEach((slice) => {
      this.drawSlice({ ctx, center, wheelRadius, rotation, slice });
      this.drawSliceText({ ctx, center, wheelRadius, centerCircleRadius, rotation, fontSize, slice });
    });

    return this;
  }

  private drawCenterCircle({
    ctx,
    center,
    centerCircleRadius,
    color,
  }: {
    ctx: CanvasRenderingContext2D;
    center: number;
    centerCircleRadius: number;
    color: string;
  }): this {
    ctx.save();

    const path = new Path2D();
    path.arc(center, center, centerCircleRadius, 0, CIRCLE);

    Object.assign(ctx, { lineWidth: 2, strokeStyle: '#fff', fillStyle: color });

    ctx.fill(path);
    ctx.stroke(path);

    ctx.restore();

    return this;
  }

  private drawCursor({
    ctx,
    center,
    padding,
    color,
  }: {
    ctx: CanvasRenderingContext2D;
    center: number;
    padding: number;
    color: string;
  }): this {
    ctx.save();

    const path = new Path2D();
    path.moveTo(center, padding / 2);
    path.lineTo(center + padding, 0);
    path.lineTo(center, padding * 2);
    path.lineTo(center - padding, 0);
    path.lineTo(center, padding / 2);

    Object.assign(ctx, { lineWidth: 2, strokeStyle: '#fff', fillStyle: color });

    ctx.fill(path);
    ctx.stroke(path);

    ctx.restore();

    return this;
  }
}
