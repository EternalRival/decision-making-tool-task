import { Component } from './component';

type Props = ConstructorParameters<typeof Component<'input'>>[1];

export class Input extends Component<'input'> {
  constructor(props?: Props) {
    super('input', props);
  }

  public getValue() {
    return this.getNode().value;
  }

  public setDisabled(value: boolean) {
    this.getNode().disabled = value;
  }
}
