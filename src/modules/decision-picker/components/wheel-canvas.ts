import AbstractComponent from '~/core/models/abstract-component';
import type OptionSliceDTO from '../models/option-slice.dto';
import styles from './wheel-canvas.module.css';

const CIRCLE = 2 * Math.PI;

const CANVAS_SIZE = 512;
const CANVAS_TEXT = 'Decision Picker Wheel';

const STROKE_COLOR_PROPERTY = '--color-primary-50';
const SHADOW_COLOR_PROPERTY = '--color-primary-900';

const GRADIENT_START_COLOR_PROPERTY = '--color-primary-300';
const GRADIENT_END_COLOR_PROPERTY = '--color-primary-700';

const DEFAULT_GRADIENT_START_COLOR = '#66baba';
const DEFAULT_GRADIENT_END_COLOR = '#005454';
const DEFAULT_STROKE_COLOR = '#e6f4f4';
const DEFAULT_SHADOW_COLOR = '#001c1c';
const DEFAULT_SLICE_TEXT_SHADOW_COLOR = '#00000080';
const FONT_FAMILY = 'Inter';

type GradientColor = {
  start: string;
  end: string;
};

type Props = {
  optionSliceList: OptionSliceDTO[];
};

export default class WheelCanvas extends AbstractComponent<'canvas'> {
  private readonly ctx: CanvasRenderingContext2D;

  constructor(private readonly props: Props) {
    super('canvas', {
      className: styles.wheelCanvas,
      textContent: CANVAS_TEXT,
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
    });

    const context = this.node.getContext('2d');

    if (!context) {
      throw new Error('Canvas context is not initialized');
    }

    this.ctx = context;
  }

  public draw({ rotation: baseRotation }: { rotation: number }): void {
    const center = CANVAS_SIZE / 2;
    const padding = CANVAS_SIZE / 32;
    const fontSize = CANVAS_SIZE / 32;
    const wheelRadius = center - padding;
    const centerCircleRadius = wheelRadius / 8;
    const rotation = (baseRotation + CIRCLE * 0.75) % CIRCLE;

    const computedStyle = getComputedStyle(document.documentElement);

    const gradientColor = {
      start: computedStyle.getPropertyValue(GRADIENT_START_COLOR_PROPERTY) || DEFAULT_GRADIENT_START_COLOR,
      end: computedStyle.getPropertyValue(GRADIENT_END_COLOR_PROPERTY) || DEFAULT_GRADIENT_END_COLOR,
    };
    const strokeColor = computedStyle.getPropertyValue(STROKE_COLOR_PROPERTY) || DEFAULT_STROKE_COLOR;
    const shadowColor = computedStyle.getPropertyValue(SHADOW_COLOR_PROPERTY) || DEFAULT_SHADOW_COLOR;

    this.ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    this.drawShadow({ center, wheelRadius, padding, shadowColor });
    this.drawSliceList({
      center,
      wheelRadius,
      centerCircleRadius,
      rotation,
      fontSize,
      strokeColor,
      textFillColor: strokeColor,
      textStrokeColor: shadowColor,
    });
    this.drawCenterCircle({ center, centerCircleRadius, gradientColor, strokeColor });
    this.drawCursor({ center, padding, gradientColor, strokeColor });
  }

  private drawShadow({
    center,
    wheelRadius,
    padding,
    shadowColor,
  }: {
    center: number;
    wheelRadius: number;
    padding: number;
    shadowColor: string;
  }): void {
    const { ctx } = this;

    ctx.save();

    const path = new Path2D();
    path.arc(center, center, wheelRadius, 0, CIRCLE);

    Object.assign(ctx, { shadowColor, shadowBlur: padding });

    ctx.fill(path);
    ctx.fill(path);

    ctx.restore();
  }

  private drawSlice({
    center,
    wheelRadius,
    rotation,
    slice,
    strokeColor,
  }: {
    center: number;
    wheelRadius: number;
    rotation: number;
    slice: OptionSliceDTO;
    strokeColor: string;
  }): void {
    const { ctx } = this;

    const { startAngle, endAngle, color } = slice;

    ctx.save();

    const path = new Path2D();
    path.moveTo(center, center);
    path.arc(center, center, wheelRadius, startAngle + rotation, endAngle + rotation);
    path.lineTo(center, center);

    Object.assign(ctx, { lineWidth: 2, strokeStyle: strokeColor, fillStyle: color });

    ctx.fill(path);
    ctx.stroke(path);

    ctx.restore();
  }

  private clipCanvasText({ text, maxWidth }: { text: string; maxWidth: number }): string {
    const { ctx } = this;

    const { actualBoundingBoxLeft, actualBoundingBoxRight } = ctx.measureText(text);

    if (actualBoundingBoxRight + actualBoundingBoxLeft < maxWidth) {
      return text;
    }

    return this.clipCanvasText({ text: `${text.slice(0, -2).trimEnd()}…`, maxWidth });
  }

  private drawSliceText({
    center,
    wheelRadius,
    centerCircleRadius,
    rotation,
    fontSize,
    slice,
    textStrokeColor,
    textFillColor,
  }: {
    center: number;
    wheelRadius: number;
    centerCircleRadius: number;
    rotation: number;
    fontSize: number;
    slice: OptionSliceDTO;
    textStrokeColor: string;
    textFillColor: string;
  }): void {
    const { ctx } = this;

    const { startAngle, endAngle, title } = slice;

    ctx.save();

    if (endAngle - startAngle > 0.25) {
      ctx.translate(center, center);
      ctx.rotate(startAngle + (endAngle - startAngle) / 2 + rotation);

      Object.assign(ctx, {
        textAlign: 'center',
        textBaseline: 'middle',
        font: `${fontSize.toString()}px ${FONT_FAMILY}`,
        lineWidth: fontSize / 8,
        strokeStyle: textStrokeColor,
        fillStyle: textFillColor,
        shadowColor: DEFAULT_SLICE_TEXT_SHADOW_COLOR,
        shadowBlur: fontSize / 2,
      });

      const text = this.clipCanvasText({ text: title, maxWidth: wheelRadius - centerCircleRadius * 2.5 });

      ctx.strokeText(text, (wheelRadius + centerCircleRadius) / 2, 0);
      ctx.fillText(text, (wheelRadius + centerCircleRadius) / 2, 0);
    }

    ctx.restore();
  }

  private drawSliceList({
    center,
    wheelRadius,
    centerCircleRadius,
    rotation,
    fontSize,
    strokeColor,
    textStrokeColor,
    textFillColor,
  }: {
    center: number;
    wheelRadius: number;
    centerCircleRadius: number;
    rotation: number;
    fontSize: number;
    strokeColor: string;
    textStrokeColor: string;
    textFillColor: string;
  }): void {
    this.props.optionSliceList.forEach((slice) => {
      this.drawSlice({ center, wheelRadius, rotation, slice, strokeColor });
      this.drawSliceText({
        center,
        wheelRadius,
        centerCircleRadius,
        rotation,
        fontSize,
        slice,
        textStrokeColor,
        textFillColor,
      });
    });
  }

  private drawCenterCircle({
    center,
    centerCircleRadius,
    gradientColor,
    strokeColor,
  }: {
    center: number;
    centerCircleRadius: number;
    gradientColor: GradientColor;
    strokeColor: string;
  }): void {
    const { ctx } = this;

    ctx.save();

    const path = new Path2D();
    path.arc(center, center, centerCircleRadius, 0, CIRCLE);

    const gradient = ctx.createLinearGradient(0, center - centerCircleRadius, 0, center + centerCircleRadius);

    gradient.addColorStop(0, gradientColor.start);
    gradient.addColorStop(1, gradientColor.end);

    Object.assign(ctx, { lineWidth: 2, strokeStyle: strokeColor, fillStyle: gradient });

    ctx.fill(path);
    ctx.stroke(path);

    ctx.restore();
  }

  private drawCursor({
    center,
    padding,
    gradientColor,
    strokeColor,
  }: {
    center: number;
    padding: number;
    gradientColor: GradientColor;
    strokeColor: string;
  }): void {
    const { ctx } = this;

    ctx.save();

    const path = new Path2D();
    path.moveTo(center, padding / 2);
    path.lineTo(center + padding, 0);
    path.lineTo(center, padding * 2);
    path.lineTo(center - padding, 0);
    path.lineTo(center, padding / 2);

    const gradient = ctx.createLinearGradient(0, 0, 0, padding * 2);

    gradient.addColorStop(0, gradientColor.start);
    gradient.addColorStop(1, gradientColor.end);

    Object.assign(ctx, { lineWidth: 2, strokeStyle: strokeColor, fillStyle: gradient });

    ctx.fill(path);
    ctx.stroke(path);

    ctx.restore();
  }
}
