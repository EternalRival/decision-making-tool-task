import { TableRow } from '~/features/wheel/components/model/table-row.type';
import { Wheel } from '~/features/wheel/components/wheel';

const tableMock: TableRow[] = [
  { label: '', score: 200 },
  { label: '', score: 400 },
  { label: '', score: 800 },
  { label: '', score: 1600 },
  { label: '', score: 3200 },
  { label: '', score: 6400 },
  { label: '', score: 12800 },
  { label: '', score: 25600 },
];

export class App {
  render(root: HTMLElement) {
    const wheel = new Wheel({ size: 512, padding: 16, table: tableMock });

    root.append(wheel.getNode());
  }
}
