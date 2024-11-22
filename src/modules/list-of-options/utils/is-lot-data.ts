import type { LotData } from '../models/lot-data.type';

export default function isLotData(value: unknown): value is LotData {
  return (
    typeof value === 'object' &&
    value !== null &&
    'title' in value &&
    typeof value.title === 'string' &&
    'weight' in value &&
    typeof value.weight === 'string'
  );
}
