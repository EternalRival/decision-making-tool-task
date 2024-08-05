import { type WheelSlice } from '../types/wheel-slice.type';

function drawShadow({
  ctx,
  center,
  wheelRadius,
  padding,
}: {
  ctx: CanvasRenderingContext2D;
  center: number;
  wheelRadius: number;
  padding: number;
}): void {
  ctx.save();

  const path = new Path2D();
  path.arc(center, center, wheelRadius, 0, Math.PI * 2);
  ctx.shadowColor = '#000';
  ctx.shadowBlur = padding;
  ctx.fill(path);
  ctx.fill(path);

  ctx.restore();
}

function drawSlice({
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
}): void {
  const { startAngle, endAngle, color } = slice;

  ctx.save();

  const path = new Path2D();
  path.moveTo(center, center);
  path.arc(center, center, wheelRadius, startAngle + rotation, endAngle + rotation);
  path.lineTo(center, center);

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = color;

  ctx.fill(path);
  ctx.stroke(path);

  ctx.restore();
}

function normalizeText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  const { actualBoundingBoxLeft, actualBoundingBoxRight } = ctx.measureText(text);

  if (actualBoundingBoxRight + actualBoundingBoxLeft < maxWidth) {
    return text;
  }

  return normalizeText(ctx, `${text.slice(0, -2)}…`, maxWidth);
}

function drawSliceText({
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
}): void {
  const { startAngle, endAngle, title } = slice;

  ctx.save();

  if (endAngle - startAngle > 0.25) {
    ctx.translate(center, center);
    ctx.rotate(startAngle + (endAngle - startAngle) / 2 + rotation);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${fontSize}px sans-serif`;

    ctx.lineWidth = fontSize / 8;
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#00000080';
    ctx.shadowBlur = fontSize / 2;

    const text = normalizeText(ctx, title, wheelRadius - centerCircleRadius * 2);

    ctx.strokeText(text, (wheelRadius + centerCircleRadius) / 2, 0);
    ctx.fillText(text, (wheelRadius + centerCircleRadius) / 2, 0);
  }

  ctx.restore();
}

function drawCenterCircle({
  ctx,
  center,
  centerCircleRadius,
  color,
}: {
  ctx: CanvasRenderingContext2D;
  center: number;
  centerCircleRadius: number;
  color: string;
}): void {
  ctx.save();

  const path = new Path2D();
  path.arc(center, center, centerCircleRadius, 0, Math.PI * 2);

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = color;
  ctx.fill(path);
  ctx.stroke(path);

  ctx.restore();
}

function drawCursor({ ctx, center, padding }: { ctx: CanvasRenderingContext2D; center: number; padding: number }) {
  ctx.save();

  const path = new Path2D();
  path.moveTo(center, padding / 2);
  path.lineTo(center + padding, 0);
  path.lineTo(center, padding * 2);
  path.lineTo(center - padding, 0);
  path.lineTo(center, padding / 2);

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#008c8c';

  ctx.fill(path);
  ctx.stroke(path);

  ctx.restore();
}

export function drawWheel({
  ctx,
  size,
  rotation,
  sliceList,
  centerCircleColor = '#008c8c',
}: {
  ctx: CanvasRenderingContext2D;
  size: number;
  rotation: number;
  sliceList: WheelSlice[];
  centerCircleColor?: string;
}) {
  const center = size / 2;
  const padding = size / 32;
  const fontSize = size / 32;
  const wheelRadius = center - padding;
  const centerCircleRadius = wheelRadius / 8;

  ctx.clearRect(0, 0, size, size);

  drawShadow({ ctx, center, wheelRadius, padding });

  sliceList.forEach((slice) => {
    drawSlice({ ctx, center, wheelRadius, rotation, slice });
    drawSliceText({ ctx, center, wheelRadius, centerCircleRadius, rotation, fontSize, slice });
  });

  drawCenterCircle({ ctx, center, centerCircleRadius, color: centerCircleColor });
  drawCursor({ ctx, center, padding });
}
