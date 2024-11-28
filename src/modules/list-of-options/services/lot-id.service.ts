import { LSService } from '~/core/services/local-storage.service';

export default class LotIdService {
  private lastId: number;

  constructor() {
    const lsLastId = LSService.get('last-id');
    this.lastId = typeof lsLastId === 'number' && lsLastId > 0 ? lsLastId : 0;
  }

  public saveCurrentLastIdToLS = (): void => {
    LSService.set('last-id', this.lastId);
  };

  public getNextId = (): string => {
    this.lastId += 1;

    return `#${this.lastId.toString()}`;
  };

  public resetId = (): void => {
    this.lastId = 0;
  };
}
