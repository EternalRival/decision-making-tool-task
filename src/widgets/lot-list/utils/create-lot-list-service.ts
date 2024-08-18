import { LSService } from '~/utils/local-storage-service';
import { type LotComponent } from '../types/lot-component.type';
import isLotDataEntriesList from './is-lot-data-entries-list';
import { type LotData } from '../types/lot-data.type';

export default function createLotListService(): {
  lotsData: [string, LotData][];
  saveLotsToLS: (lotsMap: Map<string, LotComponent>) => void;
} {
  const lsLots = LSService.get('lots') ?? [];

  return {
    lotsData: isLotDataEntriesList(lsLots) ? lsLots : [],

    saveLotsToLS: (lotsMap): void => {
      const serializedLots = Array.from(lotsMap.entries(), ([id, lot]) => {
        const { title, weight } = lot.getValues();
        return [id, { title, weight: weight.toString() }];
      });

      LSService.set('lots', serializedLots);
    },
  };
}
