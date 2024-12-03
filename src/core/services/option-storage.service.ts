import Component from '~/core/components/component';
import { OPTIONS_JSON_FILE_NAME, OPTIONS_STORAGE_KEY } from '~/core/models/constants';
import StoredOptionsDTO from '~/core/models/stored-options.dto';
import { LSService } from '~/core/services/local-storage.service';

type Props = {
  getDataToSave?: () => StoredOptionsDTO;
  onDataLoaded?: (storedOptionsDto: StoredOptionsDTO | null) => void;
};

export default class OptionStorageService {
  constructor(private readonly props: Props) {}

  private static parseStoredData(value: unknown): StoredOptionsDTO | null {
    return StoredOptionsDTO.isStoredOptionsDTOLike(value) ? new StoredOptionsDTO(value) : null;
  }

  public saveToLS = (): void => {
    if (!this.props.getDataToSave) {
      throw new Error('getDataToSave is not defined');
    }

    LSService.set(OPTIONS_STORAGE_KEY, this.props.getDataToSave());
  };

  public loadFromLS = (): void => {
    if (!this.props.onDataLoaded) {
      throw new Error('onDataLoaded is not defined');
    }

    this.props.onDataLoaded(OptionStorageService.parseStoredData(LSService.get(OPTIONS_STORAGE_KEY)));
  };

  public saveToJsonFile = (): void => {
    if (!this.props.getDataToSave) {
      throw new Error('getDataToSave is not defined');
    }

    new Component('a', {
      download: OPTIONS_JSON_FILE_NAME,
      href: URL.createObjectURL(new Blob([JSON.stringify(this.props.getDataToSave())], { type: 'application/json' })),
    }).node.click();
  };

  public loadFromJsonFile = async (): Promise<void> => {
    if (!this.props.onDataLoaded) {
      throw new Error('onDataLoaded is not defined');
    }

    this.props.onDataLoaded(
      OptionStorageService.parseStoredData(
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
}
