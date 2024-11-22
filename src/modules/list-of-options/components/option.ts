import Component from '~/core/components/component';
import Input from '~/core/components/input';
import UiButton from '~/core/components/ui-button';
import type { LotData } from '../models/lot-data.type';
import styles from './option.module.css';

const TITLE_INPUT_PLACEHOLDER_TEXT = 'Title';
const WEIGHT_INPUT_PLACEHOLDER_TEXT = 'Weight';
const DELETE_OPTION_BUTTON_TEXT = 'Delete';

export default class Option extends Component {
  private title: string;

  private weight: string;

  constructor({
    id,
    title,
    weight,
    onDeleteClick,
  }: {
    id: string;
    title: string;
    weight: string;
    onDeleteClick: () => void;
  }) {
    super('div', { className: styles.option });

    this.title = title;
    this.weight = weight;

    const inputId = `lot-${id}`;

    const lotId = new Component('label', { className: styles.id, textContent: id, htmlFor: inputId });

    const titleInput = new Input({
      className: styles.title,
      id: inputId,
      value: title,
      placeholder: TITLE_INPUT_PLACEHOLDER_TEXT,
      name: 'title',
      oninput: (e): void => {
        if (e.target instanceof HTMLInputElement) {
          this.title = e.target.value;
        }
      },
    });

    const weightInput = new Input({
      className: styles.weight,
      type: 'number',
      value: weight,
      placeholder: WEIGHT_INPUT_PLACEHOLDER_TEXT,
      name: 'weight',
      oninput: (e): void => {
        if (e.target instanceof HTMLInputElement) {
          this.weight = e.target.value;
        }
      },
    });

    const deleteButton = new UiButton({
      className: styles.deleteButton,
      type: 'button',
      textContent: DELETE_OPTION_BUTTON_TEXT,
      onclick: onDeleteClick,
    });

    this.append(lotId, titleInput, weightInput, deleteButton);
  }

  public getValues(): LotData {
    return { title: this.title, weight: this.weight };
  }
}
