import { Component } from '~/components/component';
import { getSliceList } from './lib/get-slice-list';
import { TableRow } from './model/table-row.type';
import { WheelSlice } from './model/wheel-slice.type';

export class Wheel extends Component {
  private ctx: CanvasRenderingContext2D;

  constructor({ size = 512, padding = 0, table }: { size?: number; padding?: number; table: TableRow[] }) {
    super('div');

    const canvas = new Component('canvas', { width: size, height: size, textContent: 'wheel of fortune' });
    const ctx = canvas.getNode().getContext('2d');

    if (!ctx) throw new Error();

    this.ctx = ctx;

    const radius = size / 2;
    const sliceList = getSliceList(table);
    this.drawWheel({ padding, radius, sliceList });

    this.append(canvas);
  }

  private drawSlice({ radius, padding, slice }: { radius: number; padding: number; slice: WheelSlice }) {
    const { ctx } = this;
    const { startAngle, endAngle, color } = slice;

    ctx.save();

    const slicePath = new Path2D();
    slicePath.moveTo(radius, radius);
    slicePath.arc(radius, radius, radius - padding, startAngle, endAngle);
    slicePath.lineTo(radius, radius);

    ctx.fillStyle = color;

    ctx.fill(slicePath);
    ctx.stroke(slicePath);

    ctx.restore();
  }

  private drawCenter({ radius, color }: { radius: number; color: string }) {
    const { ctx } = this;

    ctx.save();

    const centerPath = new Path2D();
    centerPath.arc(radius, radius, 30, 0, 2 * Math.PI);

    ctx.fillStyle = color;
    ctx.fill(centerPath);
    ctx.stroke(centerPath);

    ctx.restore();
  }

  private drawShadow({ radius, padding }: { radius: number; padding: number }) {
    const { ctx } = this;

    ctx.save();

    const shadowPath = new Path2D();
    shadowPath.arc(radius, radius, radius - padding, 0, Math.PI * 2);
    ctx.shadowColor = '#000';
    ctx.shadowBlur = padding;
    ctx.fill(shadowPath);
    ctx.fill(shadowPath);

    ctx.restore();
  }

  private drawWheel({ radius, padding, sliceList }: { radius: number; padding: number; sliceList: WheelSlice[] }) {
    this.drawShadow({ radius, padding });

    sliceList.forEach((slice) => this.drawSlice({ radius, padding, slice }));

    this.drawCenter({ radius, color: 'teal' });
  }
}
