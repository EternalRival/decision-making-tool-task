import { LSService } from '~/utils/local-storage-service';

export default class MuteStateService {
  private muteState = LSService.get('mute-state') === true;

  public init(): void {
    window.addEventListener('beforeunload', this.saveMuteStateToLS);
  }

  public destroy(): void {
    window.removeEventListener('beforeunload', this.saveMuteStateToLS);
    this.saveMuteStateToLS();
  }

  public get(): boolean {
    return this.muteState;
  }

  public toggle(state?: boolean): void {
    this.muteState = typeof state === 'boolean' ? state : !this.muteState;
  }

  private readonly saveMuteStateToLS = (): void => {
    LSService.set('mute-state', this.muteState);
  };
}
