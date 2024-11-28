import getRandomColor from '~/modules/list-of-options/utils/get-random-color';
import { CIRCLE } from '../models/constants';
import type { TableRow } from '../models/table-row.type';
import type { WheelSlice } from '../models/wheel-slice.type';

export default class WheelLotsService {
  private readonly total: number;

  private readonly wheelSliceList: WheelSlice[];

  constructor({ table }: { table: TableRow[] }) {
    this.total = table.reduce((acc, item) => acc + item.weight, 0);

    this.wheelSliceList = this.convertTableRowListToWheelSliceList(table);
  }

  public getSliceList(): readonly WheelSlice[] {
    return this.wheelSliceList;
  }

  public getTitleByRadian(radian: number): string {
    const offset = CIRCLE - (radian % CIRCLE);
    const slice =
      this.wheelSliceList.find(({ startAngle, endAngle }) => offset >= startAngle && offset <= endAngle) ??
      this.wheelSliceList.at(-1);

    if (!slice) {
      throw new Error('Slice not found');
    }

    return slice.title;
  }

  private getLotRadians(lotWeight: number): number {
    return (lotWeight / this.total) * CIRCLE;
  }

  private convertTableRowListToWheelSliceList(table: TableRow[]): WheelSlice[] {
    let offset = 0;

    return table.reduce<WheelSlice[]>((acc, { title, weight }) => {
      const color = getRandomColor();
      const [startAngle, endAngle] = [offset, offset + this.getLotRadians(weight)];

      offset = endAngle;

      return [...acc, { title, color, startAngle, endAngle }];
    }, []);
  }
}
