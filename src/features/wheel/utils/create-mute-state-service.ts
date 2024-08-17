import { LSService } from '~/utils/local-storage-service';

export default function createMuteStateService(): {
  getMuteState: () => boolean;
  toggleMuteState: (state?: boolean) => void;
  saveMuteStateToLS: () => void;
} {
  let muteState = LSService.get('mute-state') === true;

  return {
    getMuteState: () => muteState,

    toggleMuteState: (state): void => {
      muteState = typeof state === 'boolean' ? state : !muteState;
    },

    saveMuteStateToLS: (): void => {
      LSService.set('mute-state', muteState);
    },
  };
}
