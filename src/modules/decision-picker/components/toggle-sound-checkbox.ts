import Component from '~/core/components/component';
import SpriteIcon from '~/core/components/sprite-icon';
import AbstractComponent from '~/core/models/abstract-component';
import type ComponentProps from '~/core/models/component-props.type';
import styles from './toggle-sound-checkbox.module.css';

const TOGGLE_SOUND_BUTTON_TEXT = 'Toggle sound';

export default class ToggleSoundCheckbox extends AbstractComponent<'label'> {
  private soundIcon?: SVGSVGElement;

  private soundCheckbox?: AbstractComponent<'input'>;

  constructor(private readonly props?: ComponentProps<'input'>) {
    super('label', {
      className: styles.soundLabel,
      title: TOGGLE_SOUND_BUTTON_TEXT,
      ariaLabel: TOGGLE_SOUND_BUTTON_TEXT,
    });

    this.mount();
  }

  public toggleDisabled(value?: boolean): void {
    if (!this.soundCheckbox) {
      throw new Error('Duration input is not mounted');
    }

    const { node } = this.soundCheckbox;

    node.disabled = typeof value === 'boolean' ? value : !node.disabled;
  }

  private setSoundIcon(name: Parameters<typeof SpriteIcon>[number]['name']): void {
    const newSoundIcon = SpriteIcon({ name });
    this.soundIcon?.replaceWith(newSoundIcon);
    this.soundIcon = newSoundIcon;
  }

  private mount(): void {
    const soundCheckbox = new Component('input', {
      className: styles.soundInput,
      type: 'checkbox',
      name: this.props?.name,
      defaultChecked: this.props?.defaultChecked,
      onchange: (event): void => {
        if (event.target instanceof HTMLInputElement) {
          this.setSoundIcon(event.target.checked ? 'volume-2' : 'volume-off');
        }
      },
    });
    const soundIcon = SpriteIcon({ name: soundCheckbox.node.checked ? 'volume-2' : 'volume-off' });

    this.soundCheckbox = soundCheckbox;
    this.soundIcon = soundIcon;

    this.replaceChildren(soundCheckbox, soundIcon);
  }
}
