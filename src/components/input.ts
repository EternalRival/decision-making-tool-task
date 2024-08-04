import { Component } from './component';

type Props = ConstructorParameters<typeof Component<'input'>>[1];

export class Input extends Component<'input'> {
  constructor(props?: Props) {
    super('input', props);
  }

  public getValue() {
    return this.node.value;
  }
}
