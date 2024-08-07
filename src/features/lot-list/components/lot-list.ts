import { Component } from '~/components/component';
import { UiButton } from '~/components/ui-button';
import { loadJsonFromFile } from '~/utils/load-json-from-file';
import { saveAsJsonToFile } from '~/utils/save-as-json-to-file';
import { type LotComponent } from '../types/lot-component.type';
import { type LotData } from '../types/lot-data.type';
import { createLotIdService } from '../utils/create-lot-id-service';
import { createLotListService } from '../utils/create-lot-list-service';
import { parseLotListJson } from '../utils/parse-lot-list-json';
import { Lot } from './lot';
import styles from './lot-list.module.css';

export class LotList extends Component {
  constructor({ onStartClick }: { onStartClick: (list: { title: string; weight: number }[]) => void }) {
    super('div', { className: styles.lotList });

    const { getNextId, resetId, saveCurrentLastIdToLS } = createLotIdService();
    const { lotsData, saveLotsToLS } = createLotListService();

    const heading = new Component('h1', { className: styles.heading, textContent: 'Wheel of fortune' });
    const lotsContainer = new Component('div', { className: styles.lots });

    const lots = new Map<string, Lot>();

    function removeLot(id: string) {
      lots.get(id)?.remove();
      lots.delete(id);

      if (lots.size < 1) {
        resetId();
      }
    }

    function clearLotList() {
      lots.forEach((lot) => lot.remove());
      lots.clear();
      resetId();
    }

    function addLot(props: LotData & { id: string } = { id: getNextId(), title: '', weight: '' }) {
      const lot = new Lot({ ...props, onDeleteClick: () => removeLot(props.id) });

      lots.set(props.id, lot);
      lotsContainer.append(lot);
    }

    function getValidLotValues(lot: LotComponent) {
      const { title, weight: weightString } = lot.getValues();
      const weight = Number(weightString);

      return title && weight > 0 ? { title, weight } : null;
    }

    if (lotsData.length > 0) {
      lotsData.forEach(([id, { title, weight }]) => {
        addLot({ id, title, weight });
      });
    } else {
      addLot();
    }

    function handleAddLotClick() {
      addLot();
    }

    function handleSaveToFileClick() {
      const data = { list: Array.from(lots.values()).map((lot) => lot.getValues()) };
      const fileName = 'wheel-of-fortune-lots';

      saveAsJsonToFile({ data, fileName });
    }

    function handleLoadFromFileClick() {
      (async () => {
        const rawJsonString = await loadJsonFromFile();
        const { list } = parseLotListJson(rawJsonString);
        clearLotList();
        list.forEach(({ title, weight }) => addLot({ id: getNextId(), title, weight }));
      })();
    }

    function handleClearListClick() {
      clearLotList();
      addLot();
    }

    function handleStartClick() {
      const lotsData: { title: string; weight: number }[] = [];

      lots.forEach((lot) => {
        const lotValues = getValidLotValues(lot);

        if (lotValues) {
          lotsData.push(lotValues);
        }
      });

      onStartClick(lotsData);
    }

    function handleBeforeUnload() {
      saveLotsToLS(lots);
      saveCurrentLastIdToLS();
    }

    const addLotButton = new UiButton({
      className: styles.addLotButton,
      type: 'button',
      textContent: 'Add Lot',
      onclick: handleAddLotClick,
    });

    const clearListButton = new UiButton({
      className: styles.clearListButton,
      type: 'button',
      textContent: 'Clear list',
      onclick: handleClearListClick,
    });

    const saveToFileButton = new UiButton({
      className: styles.saveToFileButton,
      type: 'button',
      textContent: 'Save list to file',
      onclick: handleSaveToFileClick,
    });

    const loadFromFileButton = new UiButton({
      className: styles.loadFromFileButton,
      type: 'button',
      textContent: 'Load list from file',
      onclick: handleLoadFromFileClick,
    });

    const startButton = new UiButton({
      className: styles.startButton,
      type: 'button',
      textContent: 'Start',
      onclick: handleStartClick,
    });

    this.append(
      heading,
      lotsContainer,
      addLotButton,
      clearListButton,
      saveToFileButton,
      loadFromFileButton,
      startButton
    );

    window.addEventListener('beforeunload', handleBeforeUnload);

    this.remove = () => {
      super.remove();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

    startButton.getNode().click();
  }
}
