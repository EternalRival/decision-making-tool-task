import { Button } from '~/components/button';
import { Component } from '~/components/component';
import { type LotComponent } from '../types/lot-component.type';
import { createLotIdService } from '../utils/create-lot-id-service';
import { createLotListService } from '../utils/create-lot-list-service';
import { Lot } from './lot';
import styles from './lot-list.module.css';

export class LotList extends Component {
  constructor() {
    super('div', { className: styles.lotList });

    const { getNextId, resetId, saveCurrentLastIdToLS } = createLotIdService();
    const { lotsData, saveLotsToLS } = createLotListService();

    const heading = new Component('h1', { className: styles.heading, textContent: 'Lot List' });
    const container = new Component('div', { className: styles.form });

    const lots = new Map<string, Lot>();

    function removeLot(id: string) {
      lots.get(id)?.remove();
      lots.delete(id);

      if (lots.size < 1) {
        resetId();
      }
    }

    function addLot(props: { id: string; title: string; weight: string } = { id: getNextId(), title: '', weight: '' }) {
      const lot = new Lot({ ...props, onDeleteClick: () => removeLot(props.id) });

      lots.set(props.id, lot);
      container.append(lot);
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

    function handleStartClick() {
      const lotsData: { title: string; weight: number }[] = [];

      lots.forEach((lot) => {
        const lotValues = getValidLotValues(lot);

        if (lotValues) {
          lotsData.push(lotValues);
        }
      });

      if (lotsData.length > 0) {
        console.log(lotsData);
      }
    }

    function handleBeforeUnload() {
      saveLotsToLS(lots);
      saveCurrentLastIdToLS();
    }

    const addLotButton = new Button({
      className: styles.addLotButton,
      type: 'button',
      textContent: 'Add Lot',
      onclick: handleAddLotClick,
    });

    const startButton = new Button({
      className: styles.startButton,
      type: 'button',
      textContent: 'Start',
      onclick: handleStartClick,
    });

    this.append<'h1' | 'div' | 'button'>(heading, container, addLotButton, startButton);

    window.addEventListener('beforeunload', handleBeforeUnload);

    this.remove = () => {
      super.remove();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }
}
