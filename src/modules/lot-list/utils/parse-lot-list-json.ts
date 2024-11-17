import type { LotData } from '../models/lot-data.type';
import isLotData from './is-lot-data';

function isLotListJson(value: unknown): value is { list: LotData[] } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'list' in value &&
    Array.isArray(value.list) &&
    value.list.every(isLotData)
  );
}

export default function parseLotListJson(rawData: unknown): { list: LotData[] } {
  if (typeof rawData !== 'string') {
    throw new Error('raw data is not a string');
  }

  return ((raw: unknown): { list: LotData[] } => {
    if (!isLotListJson(raw)) {
      throw new Error('raw data is not a valid lot list json');
    }

    return raw;
  })(JSON.parse(rawData));
}
