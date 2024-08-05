import { Button } from '~/components/button';
import { Component } from '~/components/component';
import { Input } from '~/components/input';
import { type LotComponent } from '../types/lot-component.type';
import styles from './lot.module.css';

export class Lot extends Component<'div'> implements LotComponent {
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
    super('div', { className: styles.lot });

    this.title = title;
    this.weight = weight;

    const inputId = `lot-${id}`;

    const lotId = new Component('label', { className: styles.id, textContent: id, htmlFor: inputId });

    const titleInput = new Input({
      className: styles.title,
      id: inputId,
      value: title,
      placeholder: 'Title',
      name: 'title',
      oninput: (e) => {
        if (e.target instanceof HTMLInputElement) {
          this.title = e.target.value;
        }
      },
    });

    const weightInput = new Input({
      className: styles.weight,
      type: 'number',
      value: weight,
      placeholder: 'Weight',
      name: 'weight',
      oninput: (e) => {
        if (e.target instanceof HTMLInputElement) {
          this.weight = e.target.value;
        }
      },
    });

    const deleteButton = new Button({
      className: styles.deleteButton,
      type: 'button',
      textContent: 'Delete',
      onclick: onDeleteClick,
    });

    this.append<'label' | 'input' | 'button'>(lotId, titleInput, weightInput, deleteButton);
  }

  public getValues() {
    return { title: this.title, weight: this.weight };
  }
}
