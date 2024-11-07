import type Component from '~/components/component';
import UiAlertDialog from '~/components/ui-alert-dialog';
import getRandomNumber from '~/utils/get-random-number';
import LotList from '~/widgets/lot-list/components/lot-list';
import Wheel from '~/widgets/wheel/components/wheel';

export default class App {
  private currentPageComponent?: Component;

  public render(root: HTMLElement): void {
    const lotListPage = new LotList({
      onStartClick: (list): void => {
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

    this.currentPageComponent = lotListPage;

    root.append(this.currentPageComponent.getNode());
  }
}
