import { Component } from './component';

type Props = ConstructorParameters<typeof Component<'button'>>[1];

export class Button extends Component<'button'> {
  constructor(props?: Props) {
    super('button', props);
  }

  public setDisabled(value: boolean) {
    this.getNode().disabled = value;
  }
}
