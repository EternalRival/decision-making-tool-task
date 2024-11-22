import type Component from '~/core/components/component';
import UiAlertDialog from '~/core/components/ui-alert-dialog';
import getRandomNumber from '~/core/utils/get-random-number';
import ListOfOptions from '~/modules/list-of-options/views/list-of-options';
import DecisionPicker from '~/modules/decision-picker/views/decision-picker';

const UI_ALERT_DIALOG_TEXT = 'Please add at least 2 valid options.';

export default class App {
  private currentPageComponent?: Component;

  public render(root: HTMLElement): void {
    const lotListPage = new ListOfOptions({
      onStartClick: (list): void => {
        if (list.length < 2) {
          const errorModal = new UiAlertDialog({ alertText: UI_ALERT_DIALOG_TEXT });

          errorModal.render(root);

          return;
        }

        const table = list.toSorted(() => getRandomNumber(-1, 1));

        const modal = new DecisionPicker({ size: 512, table });

        modal.render(root);
      },
    });

    this.currentPageComponent = lotListPage;

    root.append(this.currentPageComponent.getNode());
  }
}
