import { getRandomColor } from '~/utils/get-random-color';
import { TableRow } from '../../types/table-row.type';
import { WheelSlice } from '../../types/wheel-slice.type';

export function getSliceList(table: TableRow[]): WheelSlice[] {
  const tableScoreSum = table.reduce((acc, item) => acc + item.score, 0);
  const pointWeight = (2 * Math.PI) / tableScoreSum;

  let offset = 0;

  const slicesData: WheelSlice[] = [];

  table.forEach(({ label, score }) => {
    const [startAngle, endAngle] = [offset, offset + score * pointWeight];
    const color = getRandomColor();

    slicesData.push({ label, startAngle, endAngle, color });

    offset = endAngle;
  });

  return slicesData;
}
