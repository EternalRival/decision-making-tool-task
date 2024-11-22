import Component from '~/core/components/component';
import UiButton from '~/core/components/ui-button';
import loadJsonFromFile from '~/core/utils/load-json-from-file';
import saveAsJsonToFile from '~/core/utils/save-as-json-to-file';
import Option from '../components/option';
import LotViewListService from '../services/lot-view-list-service.service';
import parseLotListJson from '../utils/parse-lot-list-json';
import styles from './list-of-options.module.css';

const HEADING_TEXT = 'Decision Making Tool';
const ADD_OPTION_BUTTON_TEXT = 'Add Option';
const CLEAR_LIST_BUTTON_TEXT = 'Clear list';
const SAVE_LIST_TO_FILE_BUTTON_TEXT = 'Save list to file';
const LOAD_LIST_FROM_FILE_BUTTON_TEXT = 'Load list from file';
const START_BUTTON_TEXT = 'Start';
const OPTIONS_FILE_NAME = 'wheel-of-fortune-lots';

type OnStartClick = (list: { title: string; weight: number }[]) => void;

export default class ListOfOptions extends Component {
  private readonly optionViewListService: LotViewListService;

  constructor({ onStartClick }: { onStartClick: OnStartClick }) {
    super('div', { className: styles.listOfOptions });

    this.optionViewListService = new LotViewListService({
      createLotComponent: (lotData): Option => new Option(lotData),
    });

    this.renderUI({ onStartClick });
  }

  public override remove(): void {
    super.remove({
      onRemove: () => {
        this.optionViewListService.destroy();
      },
    });
  }

  private renderUI({ onStartClick }: { onStartClick: OnStartClick }): void {
    const heading = new Component('h1', { className: styles.heading, textContent: HEADING_TEXT, title: HEADING_TEXT });
    const lotsContainer = new Component('div', { className: styles.optionList });

    const addLotButton = new UiButton({
      className: styles.addOptionButton,
      type: 'button',
      textContent: ADD_OPTION_BUTTON_TEXT,
    });

    const clearListButton = new UiButton({
      className: styles.clearListButton,
      type: 'button',
      textContent: CLEAR_LIST_BUTTON_TEXT,
    });

    const saveToFileButton = new UiButton({
      className: styles.saveToFileButton,
      type: 'button',
      textContent: SAVE_LIST_TO_FILE_BUTTON_TEXT,
    });

    const loadFromFileButton = new UiButton({
      className: styles.loadFromFileButton,
      type: 'button',
      textContent: LOAD_LIST_FROM_FILE_BUTTON_TEXT,
    });

    const startButton = new UiButton({ className: styles.startButton, type: 'button', textContent: START_BUTTON_TEXT });

    addLotButton.getNode().addEventListener('click', () => this.optionViewListService.add());

    saveToFileButton
      .getNode()
      .addEventListener('click', () =>
        saveAsJsonToFile({ fileName: OPTIONS_FILE_NAME, data: { list: this.optionViewListService.getValues() } })
      );

    loadFromFileButton.getNode().addEventListener('click', () => {
      void (async (): Promise<void> => {
        const rawJsonString = await loadJsonFromFile();
        const { list } = parseLotListJson(rawJsonString);

        this.optionViewListService.loadList(list);
      })();
    });

    clearListButton.getNode().addEventListener('click', () => {
      this.optionViewListService.clear();
    });

    startButton.getNode().addEventListener('click', () => onStartClick(this.optionViewListService.getValidValues()));

    this.optionViewListService.init({ lotsContainer });

    this.append(
      heading,
      lotsContainer,
      addLotButton,
      clearListButton,
      saveToFileButton,
      loadFromFileButton,
      startButton
    );
  }
}
