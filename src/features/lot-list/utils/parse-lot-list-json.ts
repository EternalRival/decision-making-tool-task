import { type LotData } from '../types/lot-data.type';

function isLotListJson(value: unknown): value is { list: LotData[] } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'list' in value &&
    Array.isArray(value.list) &&
    value.list.every((item) => typeof item.title === 'string' && typeof item.weight === 'string')
  );
}

export function parseLotListJson(rawData: unknown) {
  if (typeof rawData !== 'string') {
    throw new Error('raw data is not a string');
  }

  return ((raw: unknown) => {
    if (!isLotListJson(raw)) {
      throw new Error('raw data is not a valid lot list json');
    }

    return raw;
  })(JSON.parse(rawData));
}
