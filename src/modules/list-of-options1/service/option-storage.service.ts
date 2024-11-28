import { LSService } from '~/core/services/local-storage.service';
import type OptionDTO from '../models/option.dto';

type Props = {
  jsonFileName: string;
  storageKey: string;
  isOptionDTOLike: typeof OptionDTO.isOptionDTOLike;
  createOptionDTO: typeof OptionDTO.create;
  getDataToSave: () => StoredData;
  onDataLoaded: (storedData: StoredData | null) => void;
};

type StoredData = {
  list: OptionDTO[];
  lastId: number;
};

export default class OptionStorageService {
  constructor(private readonly props: Props) {}

  public saveToLS = (): void => {
    LSService.set(this.props.storageKey, this.props.getDataToSave());
  };

  public loadFromLS = (): void => {
    this.props.onDataLoaded(this.parseStoredData(LSService.get(this.props.storageKey)));
  };

  public saveToJsonFile = (): void => {
    const a = document.createElement('a');
    a.download = this.props.jsonFileName;
    a.href = URL.createObjectURL(new Blob([JSON.stringify(this.props.getDataToSave())], { type: 'application/json' }));
    a.click();
  };

  public loadFromJsonFile = async (): Promise<void> => {
    this.props.onDataLoaded(
      this.parseStoredData(
        JSON.parse(
          await new Promise((res) => {
            const file = document.createElement('input');
            file.type = 'file';
            file.accept = '.json';
            file.onchange = (event): void => {
              if (event.target instanceof HTMLInputElement) {
                void event.target.files?.item(0)?.text().then(res);
              }
            };

            file.click();
          })
        )
      )
    );
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
