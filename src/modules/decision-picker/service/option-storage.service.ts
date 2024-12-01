import type OptionDTO from '~/core/models/option.dto';
import { LSService } from '~/core/services/local-storage.service';

type Props = {
  storageKey: string;
  isOptionDTOLike: typeof OptionDTO.isOptionDTOLike;
  createOptionDTO: typeof OptionDTO.create;
  onDataLoaded: (storedData: StoredData | null) => void;
};

type StoredData = {
  list: OptionDTO[];
  lastId: number;
};

export default class OptionStorageService {
  constructor(private readonly props: Props) {}

  public loadFromLS = (): void => {
    this.props.onDataLoaded(this.parseStoredData(LSService.get(this.props.storageKey)));
  };

  private isValidStoredData(value: unknown): value is StoredData {
    return (
      typeof value === 'object' &&
      value !== null &&
      'lastId' in value &&
      typeof value.lastId === 'number' &&
      value.lastId > 0 &&
      'list' in value &&
      Array.isArray(value.list) &&
      value.list.every(this.props.isOptionDTOLike)
    );
  }

  private parseStoredData(value: unknown): StoredData | null {
    return this.isValidStoredData(value)
      ? { list: value.list.map(this.props.createOptionDTO), lastId: value.lastId }
      : null;
  }
}
