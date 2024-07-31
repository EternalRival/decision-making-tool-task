import { TableRow } from '~/features/wheel/types/table-row.type';
import { Wheel } from '~/features/wheel/components/wheel';
import { getRandomNumber } from '~/utils/get-random-number';

const tableMock: TableRow[] = [
  { label: 'firth', score: 2 ** 1 },
  { label: 'second', score: 2 ** 2 },
  { label: 'third', score: 2 ** 3 },
  { label: 'fourth', score: 2 ** 4 },
  { label: 'fifth', score: 2 ** 5 },
  { label: 'sixth', score: 2 ** 6 },
  { label: 'seventh', score: 2 ** 7 },
  { label: 'eighth', score: 2 ** 8 },
].sort(() => getRandomNumber(-1, 1));

export class App {
  render(root: HTMLElement) {
    const wheel = new Wheel({ size: 512, table: tableMock });

    root.append(wheel.getNode());
  }
}
