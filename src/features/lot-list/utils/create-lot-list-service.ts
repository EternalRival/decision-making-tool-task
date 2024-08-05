import { LSService } from '~/utils/local-storage-service';
import { isLotDataEntriesList } from './is-lot-data-entries-list';
import { LotComponent } from '../types/lot-component.type';

export function createLotListService() {
  const lsLots = LSService.get('lots') ?? [];

  return {
    lotsData: isLotDataEntriesList(lsLots) ? lsLots : [],

    saveLotsToLS(lotsMap: Map<string, LotComponent>) {
      const serializedLots = Array.from(lotsMap.entries(), ([id, lot]) => {
        const { title, weight } = lot.getValues();
        return [id, { title, weight: weight.toString() }];
      });

      LSService.set('lots', serializedLots);
    },
  };
}
