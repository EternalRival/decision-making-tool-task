type Props = {
  id: string;
  title?: string;
  weight?: string;
};

type OptionDTOLike = Required<Props>;

export default class OptionDTO implements Required<Props> {
  public readonly id: OptionDTOLike['id'];

  public readonly title: OptionDTOLike['title'];

  public readonly weight: OptionDTOLike['weight'];

  constructor({ id, title = '', weight = '' }: Props) {
    this.id = id;
    this.title = title;
    this.weight = weight;
  }

  public static readonly isOptionDTOLike = (value: unknown): value is OptionDTO =>
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    'title' in value &&
    typeof value.title === 'string' &&
    'weight' in value &&
    typeof value.weight === 'string';

  public static readonly create = (props: Props): OptionDTO => new OptionDTO(props);
}
