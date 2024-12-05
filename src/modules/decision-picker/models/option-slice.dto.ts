type Props = {
  id: string;
  title: string;
  color: string;
  startAngle: number;
  endAngle: number;
};

type OptionSliceDTOLike = Required<Props>;

export default class OptionSliceDTO implements OptionSliceDTOLike {
  public readonly id: OptionSliceDTOLike['id'];

  public readonly title: OptionSliceDTOLike['title'];

  public readonly color: OptionSliceDTOLike['color'];

  public readonly startAngle: OptionSliceDTOLike['startAngle'];

  public readonly endAngle: OptionSliceDTOLike['endAngle'];

  constructor({ id, title, color, startAngle, endAngle }: Props) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }

  public static readonly isOptionDTOLike = (value: unknown): value is OptionSliceDTOLike =>
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    'color' in value &&
    'startAngle' in value &&
    'endAngle' in value &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.color === 'string' &&
    typeof value.startAngle === 'number' &&
    typeof value.endAngle === 'number';

  public static readonly create = (props: Props): OptionSliceDTO => new OptionSliceDTO(props);
}
