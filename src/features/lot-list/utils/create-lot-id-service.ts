import { LSService } from '~/utils/local-storage-service';

export default function createLotIdService(): {
  getNextId: () => string;
  resetId: () => void;
  saveCurrentLastIdToLS: () => void;
} {
  let lastId = Number(LSService.get('lastId')) || 0;

  return {
    getNextId: (): string => {
      lastId += 1;
      return `#${lastId.toString()}`;
    },

    resetId: (): void => {
      lastId = 0;
    },

    saveCurrentLastIdToLS: (): void => {
      LSService.set('lastId', lastId);
    },
  };
}
