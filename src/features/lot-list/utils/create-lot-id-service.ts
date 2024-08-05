import { LSService } from '~/utils/local-storage-service';

export function createLotIdService() {
  let lastId = LSService.get('lastId') ?? 0;

  return {
    getNextId() {
      lastId += 1;
      return `#${lastId}`;
    },

    resetId() {
      lastId = 0;
    },

    saveCurrentLastIdToLS() {
      LSService.set('lastId', lastId);
    },
  };
}
