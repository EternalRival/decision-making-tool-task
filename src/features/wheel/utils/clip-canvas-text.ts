export default function clipCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  const { actualBoundingBoxLeft, actualBoundingBoxRight } = ctx.measureText(text);

  if (actualBoundingBoxRight + actualBoundingBoxLeft < maxWidth) {
    return text;
  }

  return clipCanvasText(ctx, `${text.slice(0, -2).trimEnd()}…`, maxWidth);
}
