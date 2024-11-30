import AbstractComponent from '~/core/models/abstract-component';
import type ComponentProps from '~/core/models/component-props.type';

export default class Button extends AbstractComponent<'button'> {
  constructor(props?: ComponentProps<'button'>) {
    super('button', props);
  }

  public toggleDisabled(value?: boolean): void {
    this.node.disabled = typeof value === 'boolean' ? value : !this.node.disabled;
  }
}
