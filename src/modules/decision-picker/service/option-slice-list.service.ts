import { SLICE_LIST_MIN_LENGTH } from '~/core/models/constants';
import type OptionDTO from '~/core/models/option.dto';
import getRandomColor from '~/core/utils/get-random-color';
import OptionSliceDTO from '../models/option-slice.dto';

export default class OptionSliceListService {
  private optionSliceList?: OptionSliceDTO[];

  public get isEmpty(): boolean {
    return !(Array.isArray(this.optionSliceList) && this.optionSliceList.length >= SLICE_LIST_MIN_LENGTH);
  }

  private static getOptionRadians(total: number, weight: number): number {
    return (weight / total) * 2 * Math.PI;
  }

  private static createOptionSliceList(optionDtoList: OptionDTO[]): OptionSliceDTO[] {
    const total = optionDtoList.reduce((acc, { weight }) => acc + Number(weight), 0);
    const offset = { value: 0 };

    return optionDtoList.map(({ id, title, weight }) => {
      const color = getRandomColor();
      const startAngle = offset.value;
      const endAngle = offset.value + this.getOptionRadians(total, Number(weight));

      offset.value = endAngle;

      return new OptionSliceDTO({ id, title, color, startAngle, endAngle });
    });
  }

  public setOptionSliceList(optionDtoList: OptionDTO[]): void {
    this.optionSliceList = OptionSliceListService.createOptionSliceList(optionDtoList);
  }

  public getOptionSlices(): OptionSliceDTO[] {
    if (!this.optionSliceList) {
      throw new Error('Option slice list not set');
    }

    return structuredClone(this.optionSliceList);
  }

  public getTitleByRadian(radian: number): string {
    const CIRCLE = 2 * Math.PI;
    const offset = CIRCLE - (radian % CIRCLE);
    const slices = this.getOptionSlices();

    const slice =
      slices.find(({ startAngle, endAngle }) => offset >= startAngle && offset <= endAngle) ?? slices.at(-1);

    if (!slice) {
      throw new Error('Option slice not found');
    }

    return slice.title;
  }
}
