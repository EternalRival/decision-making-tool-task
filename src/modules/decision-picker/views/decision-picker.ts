import Component from '~/core/components/component';
import UiButton from '~/core/components/ui-button';
import Route from '~/core/models/route.enum';
import HashRouter from '~/core/router/hash-router';
import styles from './decision-picker.module.css';

// const JSON_FILE_NAME = 'option-list.json';
// const STORAGE_KEY = 'option-list';

// const ADD_BUTTON_TEXT = 'Add Option';
// const PASTE_MODE_BUTTON_TEXT = 'Paste list';
// const CLEAR_LIST_BUTTON_TEXT = 'Clear list';
// const SAVE_LIST_TO_FILE_BUTTON_TEXT = 'Save list to file';
// const LOAD_LIST_FROM_FILE_BUTTON_TEXT = 'Load list from file';
// const START_BUTTON_TEXT = 'Start';

export default class ListOfOptions extends Component {
  constructor() {
    super('div', { className: styles.container });

    this.mount();
  }

  private readonly handleBeforeUnmount = (): void => {
    // this.optionStorageService.saveToLS();
    void this;
  };

  private readonly handleBeforeMount = (): void => {
    // this.optionStorageService.loadFromLS();

    window.addEventListener('beforeunload', this.handleBeforeUnmount);
  };

  private mount(): void {
    this.handleBeforeMount();

    const someButton = new UiButton({
      className: styles.someButton,
      textContent: 'Some Button',
      onclick: (): void => HashRouter.navigate(Route.HOME),
    });

    this.replaceChildren(someButton);
  }
}
