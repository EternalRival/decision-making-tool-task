import Component from '~/core/components/component';
import type OptionDTO from '~/core/models/option.dto';
import { LSService } from '~/core/services/local-storage.service';

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
    new Component('a', {
      download: this.props.jsonFileName,
      href: URL.createObjectURL(new Blob([JSON.stringify(this.props.getDataToSave())], { type: 'application/json' })),
    }).node.click();
  };

  public loadFromJsonFile = async (): Promise<void> => {
    this.props.onDataLoaded(
      this.parseStoredData(
        JSON.parse(
          await new Promise((res) => {
            new Component('input', {
              type: 'file',
              accept: '.json',
              onchange: (event): void => {
                if (event.target instanceof HTMLInputElement) {
                  void event.target.files?.item(0)?.text().then(res);
                }
              },
            }).node.click();
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
