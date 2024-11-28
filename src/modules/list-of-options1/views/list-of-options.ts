import Component from '~/core/components/component';
import UiButton from '~/core/components/ui-button';
import Option from '../components/option';
import OptionList from '../components/option-list';
import OptionListPasteModal from '../components/option-list-paste-modal';
import OptionDTO from '../models/option.dto';
import OptionIdService from '../service/option-id.service';
import OptionMapService from '../service/option-map.service';
import OptionStorageService from '../service/option-storage.service';
import styles from './list-of-options.module.css';

const ADD_BUTTON_TEXT = 'Add Option';
const PASTE_MODE_BUTTON_TEXT = 'Paste list';
const CLEAR_LIST_BUTTON_TEXT = 'Clear list';
const SAVE_LIST_TO_FILE_BUTTON_TEXT = 'Save list to file';
const LOAD_LIST_FROM_FILE_BUTTON_TEXT = 'Load list from file';
const START_BUTTON_TEXT = 'Start';

export default class ListOfOptions extends Component {
  private readonly optionIdService = new OptionIdService();

  private readonly optionMapService = new OptionMapService({
    createOption: (optionDto): Option =>
      new Option({
        optionDto: optionDto ?? new OptionDTO({ id: `#${this.optionIdService.getNextId()}` }),
        onDeleteButtonClick: this.optionMapService.removeOption,
      }),
    onReset: this.optionIdService.resetId,
  });

  private readonly optionStorageService = new OptionStorageService({
    jsonFileName: 'option-list.json',
    storageKey: 'option-list',
    isOptionDTOLike: OptionDTO.isOptionDTOLike,
    createOptionDTO: OptionDTO.create,
    getDataToSave: (): { lastId: number; list: OptionDTO[] } => ({
      lastId: this.optionIdService.getId(),
      list: this.optionMapService.getOptions(),
    }),
    onDataLoaded: (storedData: { lastId: number; list: OptionDTO[] } | null): void => {
      this.optionMapService.removeOptions();

      if (storedData) {
        this.optionIdService.setId(storedData.lastId);
        this.optionMapService.addOptions(storedData.list);
      }
    },
  });

  constructor() {
    super('div', { className: styles.container });

    this.mount();
  }

  private readonly handleBeforeUnmount = (): void => {
    this.optionStorageService.saveToLS();
  };

  private readonly handleBeforeMount = (): void => {
    this.optionStorageService.loadFromLS();

    window.addEventListener('beforeunload', this.handleBeforeUnmount);
  };

  private mount(): void {
    this.handleBeforeMount();

    const optionList = new OptionList({ optionList: this.optionMapService.getOptions() });

    const addButton = new UiButton({
      className: styles.addOptionButton,
      textContent: ADD_BUTTON_TEXT,
      onclick: (): void => {
        this.optionMapService.addOption();
        optionList.update({ optionList: this.optionMapService.getOptions() });
      },
    });

    const pasteListButton = new UiButton({
      className: styles.pasteListButton,
      textContent: PASTE_MODE_BUTTON_TEXT,
      onclick: (): void => {
        const optionListPasteModal = new OptionListPasteModal({
          onConfirm: (pasteData): void => {
            pasteData.forEach(([title, weight]) => {
              const id = `#${this.optionIdService.getNextId()}`;

              this.optionMapService.addOption(new OptionDTO({ id, title, weight }));
            });

            optionList.update({ optionList: this.optionMapService.getOptions() });
          },
        });

        void optionListPasteModal.openDialog();
      },
    });

    const clearListButton = new UiButton({
      className: styles.clearListButton,
      textContent: CLEAR_LIST_BUTTON_TEXT,
      onclick: (): void => {
        this.optionMapService.removeOptions();
        optionList.update({ optionList: this.optionMapService.getOptions() });
      },
    });

    const saveListButton = new UiButton({
      className: styles.saveListButton,
      textContent: SAVE_LIST_TO_FILE_BUTTON_TEXT,
      onclick: (): void => this.optionStorageService.saveToJsonFile(),
    });

    const loadListButton = new UiButton({
      className: styles.loadListButton,
      textContent: LOAD_LIST_FROM_FILE_BUTTON_TEXT,
      onclick: async (): Promise<void> => {
        await this.optionStorageService.loadFromJsonFile();
        optionList.update({ optionList: this.optionMapService.getOptions() });
      },
    });

    const startButton = new UiButton({
      className: styles.startButton,
      textContent: START_BUTTON_TEXT,
      onclick: (): void => {},
    });

    this.replaceChildren(
      optionList,
      addButton,
      pasteListButton,
      clearListButton,
      saveListButton,
      loadListButton,
      startButton
    );
  }
}
