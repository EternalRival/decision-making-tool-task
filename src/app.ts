import type Component from '~/core/components/component';
import UiAlertDialog from '~/core/components/ui-alert-dialog';
import getRandomNumber from '~/core/utils/get-random-number';
import LotList from '~/modules/lot-list/views/lot-list';
import Wheel from '~/modules/wheel/views/wheel';

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
