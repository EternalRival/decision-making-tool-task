import { UiAlertDialog } from '~/components/ui-alert-dialog';
import { LotList } from '~/features/lot-list/components/lot-list';
import { Wheel } from '~/features/wheel/components/wheel';
import { getRandomNumber } from '~/utils/get-random-number';

export class App {
  render(root: HTMLElement) {
    const lotList = new LotList({
      onStartClick: (list) => {
        if (list.length < 2) {
          const errorModal = new UiAlertDialog({ alertText: 'Please add at least 2 valid lots.' });

          errorModal.render(root);

          return;
        }

        const table = list.toSorted(() => getRandomNumber(-1, 1));

        const modal = new Wheel({ size: 512, table });

        modal.render(root);
      },
    });

    root.append(lotList.getNode());
  }
}
