import Component from '~/core/components/component';
import SpriteIcon from '~/core/components/sprite-icon';
import AbstractComponent from '~/core/models/abstract-component';
import type ComponentProps from '~/core/models/component-props.type';
import styles from './duration-input.module.css';

const DURATION_LABEL_TEXT = 'Duration';
const DURATION_INPUT_PLACEHOLDER_TEXT = 'sec';
const DURATION_MIN_VALUE = '5';
const DURATION_INITIAL_VALUE = '16';

export default class DurationInput extends AbstractComponent<'label'> {
  private durationInput?: AbstractComponent<'input'>;

  constructor(private readonly props: ComponentProps<'input'>) {
    super('label', {
      className: styles.durationLabel,
      title: DURATION_LABEL_TEXT,
      ariaLabel: DURATION_LABEL_TEXT,
    });

    this.mount();
  }

  public toggleDisabled(value?: boolean): void {
    if (!this.durationInput) {
      throw new Error('Duration input is not mounted');
    }

    const { node } = this.durationInput;

    node.disabled = typeof value === 'boolean' ? value : !node.disabled;
  }

  private mount(): void {
    const durationInput = new Component('input', {
      className: styles.durationInput,
      type: 'number',
      name: this.props?.name,
      min: DURATION_MIN_VALUE,
      defaultValue: DURATION_INITIAL_VALUE,
      required: true,
      placeholder: DURATION_INPUT_PLACEHOLDER_TEXT,
      onkeydown: (event): void => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      },
    });
    const timerIcon = SpriteIcon({ name: 'timer' });

    this.durationInput = durationInput;

    this.replaceChildren(timerIcon, durationInput);
  }
}
