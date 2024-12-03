import { SOUND_STORAGE_KEY } from '~/core/models/constants';
import { LSService } from '~/core/services/local-storage.service';

type SoundState = {
  soundEnabled: boolean;
};

type Props = {
  getDataToSave?: () => SoundState;
  onDataLoaded?: (storedSoundState: SoundState | null) => void;
};

export default class SoundStorageService {
  constructor(private readonly props: Props) {}

  private static parseStoredData(value: unknown): SoundState | null {
    if (
      typeof value === 'object' &&
      value !== null &&
      'soundEnabled' in value &&
      typeof value.soundEnabled === 'boolean'
    ) {
      return { soundEnabled: value.soundEnabled };
    }

    return null;
  }

  public saveToLS = (): void => {
    if (!this.props.getDataToSave) {
      throw new Error('getDataToSave is not defined');
    }

    LSService.set(SOUND_STORAGE_KEY, this.props.getDataToSave());
  };

  public loadFromLS = (): void => {
    if (!this.props.onDataLoaded) {
      throw new Error('onDataLoaded is not defined');
    }

    this.props.onDataLoaded(SoundStorageService.parseStoredData(LSService.get(SOUND_STORAGE_KEY)));
  };
}
