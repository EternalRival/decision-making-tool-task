import type { LotData } from '../types/lot-data.type';
import isLotData from './is-lot-data';

export default function isLotDataEntriesList(value: unknown): value is [string, LotData][] {
  return (
    Array.isArray(value) &&
    value.every((item) => Array.isArray(item) && item.length === 2 && typeof item[0] === 'string' && isLotData(item[1]))
  );
}
