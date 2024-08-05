import { LotList } from '~/features/lot-list/components/lot-list';
import { Wheel } from '~/features/wheel/components/wheel';
import { getRandomNumber } from '~/utils/get-random-number';

export class App {
  render(root: HTMLElement) {
    const lotList = new LotList({
      onStartClick: (list) => {
        const table = list.toSorted(() => getRandomNumber(-1, 1));
        const wheel = new Wheel({ table });

        wheel.render(root);
      },
    });

    root.append(lotList.getNode());
  }
}
