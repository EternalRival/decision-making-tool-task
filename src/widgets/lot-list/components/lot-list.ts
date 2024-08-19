import Component from '~/components/component';
import UiButton from '~/components/ui-button';
import loadJsonFromFile from '~/utils/load-json-from-file';
import saveAsJsonToFile from '~/utils/save-as-json-to-file';
import LotViewListService from '../services/lot-view-list-service.service';
import parseLotListJson from '../utils/parse-lot-list-json';
import styles from './lot-list.module.css';

type OnStartClick = (list: { title: string; weight: number }[]) => void;

export default class LotList extends Component {
  private lotViewListService: LotViewListService;

  constructor({ onStartClick }: { onStartClick: OnStartClick }) {
    super('div', { className: styles['lotList'] });

    this.lotViewListService = new LotViewListService();

    this.renderUI({ onStartClick });
  }

  public override remove(): void {
    super.remove();
    this.lotViewListService.destroy();
  }

  private renderUI({ onStartClick }: { onStartClick: OnStartClick }): void {
    const heading = new Component('h1', { className: styles['heading'], textContent: 'Wheel of Fortune' });
    const lotsContainer = new Component('div', { className: styles['lots'] });

    const addLotButton = new UiButton({ className: styles['addLotButton'], type: 'button', textContent: 'Add Lot' });

    const clearListButton = new UiButton({
      className: styles['clearListButton'],
      type: 'button',
      textContent: 'Clear list',
    });

    const saveToFileButton = new UiButton({
      className: styles['saveToFileButton'],
      type: 'button',
      textContent: 'Save list to file',
    });

    const loadFromFileButton = new UiButton({
      className: styles['loadFromFileButton'],
      type: 'button',
      textContent: 'Load list from file',
    });

    const startButton = new UiButton({ className: styles['startButton'], type: 'button', textContent: 'Start' });

    addLotButton.getNode().addEventListener('click', () => this.lotViewListService.add());

    saveToFileButton.getNode().addEventListener('click', () =>
      saveAsJsonToFile({
        fileName: 'wheel-of-fortune-lots',
        data: { list: this.lotViewListService.getValues() },
      })
    );

    loadFromFileButton.getNode().addEventListener('click', () => {
      void (async (): Promise<void> => {
        const rawJsonString = await loadJsonFromFile();
        const { list } = parseLotListJson(rawJsonString);
        this.lotViewListService.clear();
        list.forEach(({ title, weight }) => {
          this.lotViewListService.add({ title, weight });
        });
      })();
    });

    clearListButton.getNode().addEventListener('click', () => {
      this.lotViewListService.clear();
    });

    startButton.getNode().addEventListener('click', () => onStartClick(this.lotViewListService.getValidValues()));

    this.lotViewListService.init({ lotsContainer });

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
