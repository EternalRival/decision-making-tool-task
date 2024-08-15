import { LSService } from '~/utils/local-storage-service';

export function createMuteStateService() {
  let muteState = LSService.get('mute-state') ?? false;

  return {
    getMuteState() {
      return muteState;
    },

    toggleMuteState(state?: boolean) {
      muteState = typeof state === 'boolean' ? state : !muteState;
    },

    saveMuteStateToLS() {
      LSService.set('mute-state', muteState);
    },
  };
}
