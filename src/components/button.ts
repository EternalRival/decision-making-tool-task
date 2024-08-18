import Component from './component';

type Props = ConstructorParameters<typeof Component<'button'>>[1];

export default class Button extends Component<'button'> {
  constructor(props?: Props) {
    super('button', props);
  }

  public toggleDisabled(value?: boolean): void {
    const node = this.getNode();

    node.disabled = typeof value === 'boolean' ? value : !node.disabled;
  }

  public setSVGIcon(svgString: string): void {
    const node = this.getNode();

    node.replaceChildren();
    node.insertAdjacentHTML('beforeend', svgString);
  }
}
