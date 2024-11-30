import type AbstractOption from '../models/abstract-option';
import type OptionDTO from '../models/option.dto';

export default class OptionMapService {
  private readonly optionMap = new Map<string, AbstractOption>();

  constructor(
    private readonly props: {
      createOption: (optionDto?: OptionDTO) => AbstractOption;
      onReset: () => void;
    }
  ) {}

  private get isEmpty(): boolean {
    return this.optionMap.size < 1;
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

    if (this.isEmpty) {
      this.props.onReset();
    }
  };

  public removeOptions = (): void => {
    this.optionMap.forEach((option) => option.node.remove());
    this.optionMap.clear();

    this.props.onReset();
  };

  public getOptions = (): AbstractOption[] => Array.from(this.optionMap.values());
}
