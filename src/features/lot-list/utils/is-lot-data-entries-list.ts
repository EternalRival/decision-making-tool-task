import { LotData } from '../types/lot-data.type';

export function isLotDataEntriesList(value: unknown): value is [string, LotData][] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        Array.isArray(item) &&
        typeof item[0] === 'string' &&
        typeof item[1] === 'object' &&
        item[1] !== null &&
        typeof item[1].title === 'string' &&
        typeof item[1].weight === 'string'
    )
  );
}
