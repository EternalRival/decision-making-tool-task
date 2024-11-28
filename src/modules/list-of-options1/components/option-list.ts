import Component from '~/core/components/component';
import type Option from './option';
import style from './option-list.module.css';

type Props = {
  optionList: Option[];
};

export default class OptionList extends Component<'ul'> {
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
