import type Component from '~/core/components/component';
import { LSService } from '~/core/utils/local-storage-service';
import type Option from '../components/option';
import type { LotData } from '../models/lot-data.type';
import isLotDataEntriesList from '../utils/is-lot-data-entries-list';
import LotIdService from './lot-id.service';

type CreateLotComponent = (lotData: ConstructorParameters<typeof Option>[0]) => Option;

export default class LotViewListService {
  private readonly idService = new LotIdService();

  private readonly lots = new Map<string, Option>();

  private _lotsContainer: Component<'div'> | null = null;

  private readonly createLotComponent: CreateLotComponent;

  constructor({ createLotComponent }: { createLotComponent: CreateLotComponent }) {
    this.createLotComponent = createLotComponent;
  }

  private get lotsContainer(): Component<'div'> {
    if (!this._lotsContainer) {
      throw new Error('lotsContainer is not defined');
    }

    return this._lotsContainer;
  }

  private static readonly parseValidLotValues = (lot: Option): { title: string; weight: number } | null => {
    const { title, weight: weightString } = lot.getValues();
    const weight = Number(weightString);

    return title && weight > 0 ? { title, weight } : null;
  };

  public init({ lotsContainer }: { lotsContainer: Component<'div'> }): this {
    this._lotsContainer = lotsContainer;

    const lsLots = LSService.get('lots');
    const lotsEntries = isLotDataEntriesList(lsLots) ? lsLots : [];

    if (lotsEntries.length > 0) {
      lotsEntries.forEach(([id, { title, weight }]) => {
        this.add({ id, title, weight });
      });
    } else {
      this.add();
    }

    window.addEventListener('beforeunload', this.saveLotsToLS);
    window.addEventListener('beforeunload', this.saveCurrentLastIdToLS);

    return this;
  }

  public destroy(): void {
    window.removeEventListener('beforeunload', this.saveLotsToLS);
    window.removeEventListener('beforeunload', this.saveCurrentLastIdToLS);
    this.saveLotsToLS();
    this.saveCurrentLastIdToLS();
  }

  public remove(id: string): void {
    this.lots.get(id)?.remove();
    this.lots.delete(id);

    if (this.lots.size < 1) {
      this.idService.resetId();
      this.add();
    }
  }

  public clear(): void {
    this.lotsContainer.replaceChildren();
    this.lots.clear();
    this.idService.resetId();
    this.add();
  }

  public add = (props: LotData & { id?: string } = { title: '', weight: '' }): void => {
    const id = props.id ?? this.idService.getNextId();
    const { title, weight } = props;
    const onDeleteClick = (): void => this.remove(id);

    const lot = this.createLotComponent({ id, title, weight, onDeleteClick });

    this.lots.set(id, lot);
    this.lotsContainer.append(lot);
  };

  public loadList(lotDataList: LotData[]): void {
    this.lotsContainer.replaceChildren();
    this.lots.clear();
    this.idService.resetId();
    lotDataList.forEach(this.add);
  }

  public getValues(): LotData[] {
    return Array.from(this.lots.values()).map((lot) => lot.getValues());
  }

  public getValidValues(): { title: string; weight: number }[] {
    const validLotsData: { title: string; weight: number }[] = [];

    this.lots.forEach((lot) => {
      const lotValues = LotViewListService.parseValidLotValues(lot);

      if (lotValues) {
        validLotsData.push(lotValues);
      }
    });

    return validLotsData;
  }

  private readonly saveLotsToLS = (): void => {
    const serializedLots = Array.from(this.lots.entries(), ([id, lot]) => {
      const { title, weight } = lot.getValues();

      return [id, { title, weight: weight.toString() }];
    });

    LSService.set('lots', serializedLots);
  };

  private readonly saveCurrentLastIdToLS = (): void => {
    this.idService.saveCurrentLastIdToLS();
  };
}
