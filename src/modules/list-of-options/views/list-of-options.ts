import Component from '~/core/components/component';
import UiButton from '~/core/components/ui-button';
import AbstractComponent from '~/core/models/abstract-component';
import { APP_NAME } from '~/core/models/constants';
import OptionDTO from '~/core/models/option.dto';
import Route from '~/core/models/route.enum';
import StoredOptionsDTO from '~/core/models/stored-options.dto';
import HashRouter from '~/core/router/hash-router';
import OptionStorageService from '~/core/services/option-storage.service';
import Option from '../components/option';
import OptionList from '../components/option-list';
import OptionListPasteModal from '../components/option-list-paste-modal';
import WarningModal from '../components/warning-modal';
import type AbstractOptionComponent from '../models/abstract-option-component';
import OptionIdService from '../service/option-id.service';
import OptionMapService from '../service/option-map.service';
import styles from './list-of-options.module.css';

const ADD_BUTTON_TEXT = 'Add Option';
const PASTE_MODE_BUTTON_TEXT = 'Paste list';
const CLEAR_LIST_BUTTON_TEXT = 'Clear list';
const SAVE_LIST_TO_FILE_BUTTON_TEXT = 'Save list to file';
const LOAD_LIST_FROM_FILE_BUTTON_TEXT = 'Load list from file';
const START_BUTTON_TEXT = 'Start';

export default class ListOfOptions extends AbstractComponent {
  private readonly optionIdService = new OptionIdService();

  private readonly optionMapService = new OptionMapService({
    createOption: (optionDto): AbstractOptionComponent =>
      new Option({
        optionDto: optionDto ?? new OptionDTO({ id: `#${this.optionIdService.getNextId().toString()}` }),
        onDeleteButtonClick: this.optionMapService.removeOption,
      }),
    onReset: this.optionIdService.resetId,
  });

  private readonly optionStorageService = new OptionStorageService({
    getDataToSave: (): StoredOptionsDTO =>
      new StoredOptionsDTO({
        lastId: this.optionIdService.getId(),
        list: this.optionMapService.getOptions(),
      }),
    onDataLoaded: (storedOptionsDto: StoredOptionsDTO | null): void => {
      if (storedOptionsDto) {
        this.optionMapService.removeOptions();
        this.optionIdService.setId(storedOptionsDto.lastId);
        this.optionMapService.addOptions(storedOptionsDto.list);
      } else {
        this.optionMapService.addOption();
      }
    },
  });

  constructor() {
    super('main', { className: styles.main });

    this.mount();
  }

  public override remove(): void {
    this.handleBeforeUnmount();
    super.remove();
  }

  private handleBeforeMount(): void {
    this.optionStorageService.loadFromLS();
  }

  private handleBeforeUnmount(): void {
    this.optionStorageService.saveToLS();
  }

  private mount(): void {
    this.handleBeforeMount();

    const heading = new Component('h1', { className: styles.heading, textContent: APP_NAME, title: APP_NAME });

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
        void new OptionListPasteModal({
          onConfirm: (pasteData): void => {
            pasteData.forEach(([title, weight]) => {
              const id = `#${this.optionIdService.getNextId().toString()}`;

              this.optionMapService.addOption(new OptionDTO({ id, title, weight }));
            });

            optionList.update({ optionList: this.optionMapService.getOptions() });
          },
        }).openDialog();
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
      onclick: (): void => {
        this.optionStorageService.saveToJsonFile();
      },
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
      onclick: (): void => {
        if (this.optionMapService.isPlayable) {
          HashRouter.navigate(Route.DECISION_PICKER);
        } else {
          void new WarningModal().openDialog();
        }
      },
    });

    this.replaceChildren(
      heading,
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
