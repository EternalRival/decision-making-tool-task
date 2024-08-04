import { Button } from '~/components/button';
import { Component } from '~/components/component';
import { LSService } from '~/utils/local-storage-service';
import { isLotDataEntriesList } from '../utils/is-lot-data-entries-list';
import { Lot } from './lot';
import styles from './lot-list.module.css';

export class LotList extends Component {
  constructor() {
    super('div', { className: styles.lotList });
    const heading = new Component('h1', { className: styles.heading, textContent: 'Lot List' });

    let lastId = LSService.get('lastId') ?? 0;

    const lots = new Map<string, Lot>();

    const container = new Component('div', { className: styles.form });

    const removeLot = (id: string) => {
      lots.get(id)?.remove();
      lots.delete(id);

      if (lots.size < 1) {
        lastId = 0;
      }
    };

    const createLot = () => {
      lastId += 1;
      const id = `#${lastId}`;

      const lot = new Lot({
        id,
        title: '',
        weight: '',
        onDeleteClick: () => removeLot(id),
      });

      lots.set(id, lot);
      container.append(lot);
    };

    const lsLots = LSService.get('lots') ?? [];
    if (isLotDataEntriesList(lsLots)) {
      lsLots.forEach(([id, { title, weight }]) => {
        const onDeleteClick = () => removeLot(id);
        lots.set(id, new Lot({ id, title, weight, onDeleteClick }));
      });
    }

    const addLotButton = new Button({
      className: styles.addLotButton,
      type: 'button',
      textContent: 'Add Lot',
      onclick: () => createLot(),
    });

    const startButton = new Button({
      className: styles.startButton,
      type: 'button',
      textContent: 'Start',
      onclick: () => {
        const lotsData: { title: string; weight: number }[] = [];

        lots.forEach((lot) => {
          const { title, weight: weightString } = lot.getValues();
          const weight = Number(weightString);

          if (title && weight) {
            lotsData.push({ title, weight });
          }
        });

        if (lotsData.length > 0) {
          console.log(lotsData);
        }
      },
    });

    if (lots.size > 0) {
      container.append(...lots.values());
    } else {
      createLot();
    }

    this.append<'h1' | 'div' | 'button'>(heading, container, addLotButton, startButton);

    const handleBeforeUnload = () => {
      const serializedLots = Array.from(lots.entries(), ([id, lot]) => {
        const { title, weight } = lot.getValues();
        return [id, { title, weight: weight.toString() }];
      });
      LSService.set('lots', serializedLots);
      LSService.set('lastId', lastId);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    this.remove = () => {
      super.remove();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }
}
