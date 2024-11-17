import Component from '~/core/components/component';

type Props = ConstructorParameters<typeof Component<'input'>>[1];

export default class Input extends Component<'input'> {
  constructor(props?: Props) {
    super('input', props);
  }

  public getValue(): string {
    return this.getNode().value;
  }

  public setDisabled(value: boolean): void {
    this.getNode().disabled = value;
  }
}
