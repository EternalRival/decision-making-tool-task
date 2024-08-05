import { getRandomColor } from '~/utils/get-random-color';
import { type TableRow } from '../types/table-row.type';
import { type WheelSlice } from '../types/wheel-slice.type';

export function getSliceList(table: TableRow[]): WheelSlice[] {
  const tableScoreSum = table.reduce((acc, item) => acc + item.weight, 0);
  const pointWeight = (2 * Math.PI) / tableScoreSum;

  let offset = 0;

  const slicesData: WheelSlice[] = [];

  table.forEach(({ title, weight }) => {
    const [startAngle, endAngle] = [offset, offset + weight * pointWeight];
    const color = getRandomColor();

    slicesData.push({ title, startAngle, endAngle, color });

    offset = endAngle;
  });

  return slicesData;
}
