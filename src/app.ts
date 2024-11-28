// import Component from '~/core/components/component';
// import UiAlertDialog from '~/core/components/ui-alert-dialog';
// import getRandomNumber from '~/core/utils/get-random-number';
// import ListOfOptions from '~/modules/list-of-options1/views/list-of-options';
// import DecisionPicker from '~/modules/decision-picker/views/decision-picker';
import HomePage from './routes/home';

// const HEADING_TEXT = 'Decision Making Tool';
// const UI_ALERT_DIALOG_TEXT = 'Please add at least 2 valid options.';

export default class App {
  private readonly root: HTMLElement;

  constructor({ root }: { root: HTMLElement }) {
    this.root = root;
  }

  public render(): void {
    const homePage = new HomePage();

    this.root.replaceChildren(homePage.getNode());

    /* const lotListPage = new ListOfOptions({
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

    root.append(this.currentPageComponent.getNode()); */
  }
}
