import AbstractComponent from '~/core/models/abstract-component';
import style from './option-list.module.css';

type Props = {
  optionList: AbstractComponent[];
};

export default class OptionList extends AbstractComponent<'ul'> {
  constructor(private readonly props: Props) {
    super('ul', { className: style.list });

    this.mount();
  }

  public update(props: Props): void {
    this.replaceChildren(...props.optionList);
  }

  private mount(): void {
    this.replaceChildren(...this.props.optionList);
  }
}
