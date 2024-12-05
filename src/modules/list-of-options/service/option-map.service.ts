import OptionDTO from '~/core/models/option.dto';
import { SLICE_LIST_MIN_LENGTH } from '~/core/models/constants';
import type AbstractOptionComponent from '../models/abstract-option-component';

export default class OptionMapService {
  private readonly optionMap = new Map<string, AbstractOptionComponent>();

  constructor(
    private readonly props: {
      createOption: (optionDto?: OptionDTO) => AbstractOptionComponent;
      onReset: () => void;
    }
  ) {}

  public get isPlayable(): boolean {
    return this.getOptions().filter(OptionDTO.isOptionDTOValid).length >= SLICE_LIST_MIN_LENGTH;
  }

  public addOption = (optionDto?: OptionDTO): void => {
    const option = this.props.createOption(optionDto);

    this.optionMap.set(option.id, option);
  };

  public addOptions = (optionDtoList: OptionDTO[]): void => {
    optionDtoList.forEach(this.addOption);
  };

  public removeOption = (optionId: string): void => {
    this.optionMap.get(optionId)?.remove();
    this.optionMap.delete(optionId);

    if (this.optionMap.size < 1) {
      this.props.onReset();
    }
  };

  public removeOptions = (): void => {
    this.optionMap.forEach((option) => option.node.remove());
    this.optionMap.clear();

    this.props.onReset();
  };

  public getOptions = (): AbstractOptionComponent[] => Array.from(this.optionMap.values());
}
