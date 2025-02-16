import OptionDTO from './option.dto';

type Props = {
  list: OptionDTO[];
  lastId: number;
};

type StoredOptionsDTOLike = Required<Props>;

export default class StoredOptionsDTO implements Required<Props> {
  public readonly list: StoredOptionsDTOLike['list'];

  public readonly lastId: StoredOptionsDTOLike['lastId'];

  constructor({ list, lastId }: Props) {
    this.list = list.map(OptionDTO.create);
    this.lastId = lastId;
  }

  public static readonly isStoredOptionsDTOLike = (value: unknown): value is StoredOptionsDTOLike =>
    typeof value === 'object' &&
    value !== null &&
    'lastId' in value &&
    typeof value.lastId === 'number' &&
    value.lastId >= 0 &&
    'list' in value &&
    Array.isArray(value.list) &&
    value.list.every(OptionDTO.isOptionDTOLike);

  public static readonly create = (props: Props): StoredOptionsDTO => new StoredOptionsDTO(props);
}
