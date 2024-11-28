import Component from '~/core/components/component';
import Input from '~/core/components/input';
import UiButton from '~/core/components/ui-button';
import type OptionDTO from '../models/option.dto';
import styles from './option.module.css';

const TITLE_INPUT_PLACEHOLDER_TEXT = 'Title';
const WEIGHT_INPUT_PLACEHOLDER_TEXT = 'Weight';
const DELETE_BUTTON_TEXT = 'Delete';

type State = {
  title: string;
  weight: string;
};

type Props = {
  optionDto: OptionDTO;
  onDeleteButtonClick: (optionId: string) => void;
};

export default class Option extends Component<'li'> {
  private readonly state: State;

  constructor(private readonly props: Props) {
    super('li', { className: styles.option });

    const { title, weight } = this.props.optionDto;

    this.state = { title, weight };

    this.mount();
  }

  public get id(): string {
    return this.props.optionDto.id;
  }

  public get title(): string {
    return this.state.title;
  }

  public get weight(): string {
    return this.state.weight;
  }

  public toJSON(): OptionDTO {
    return { id: this.id, title: this.title, weight: this.weight };
  }

  private mount(): void {
    const inputId = `option-${this.id}`;

    const id = new Component('label', {
      className: styles.id,
      textContent: this.id,
      htmlFor: inputId,
    });

    const titleInput = new Input({
      className: styles.title,
      id: inputId,
      defaultValue: this.title,
      placeholder: TITLE_INPUT_PLACEHOLDER_TEXT,
      name: 'title',
      oninput: (event): void => {
        if (event.target instanceof HTMLInputElement) {
          this.state.title = event.target.value;
        }
      },
    });

    const weightInput = new Input({
      className: styles.weight,
      type: 'number',
      defaultValue: this.weight,
      placeholder: WEIGHT_INPUT_PLACEHOLDER_TEXT,
      name: 'weight',
      oninput: (event): void => {
        if (event.target instanceof HTMLInputElement) {
          this.state.weight = event.target.value;
        }
      },
    });

    const deleteButton = new UiButton({
      className: styles.deleteButton,
      type: 'button',
      textContent: DELETE_BUTTON_TEXT,
      onclick: (): void => this.props.onDeleteButtonClick(this.id),
    });

    this.replaceChildren(id, titleInput, weightInput, deleteButton);
  }
}
