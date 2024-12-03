export default class OptionMapService {
  private readonly optionMap = new Map<string, unknown>();

  constructor(private readonly props: unknown) {
    void this.props;
    void this.optionMap;
  }
}
