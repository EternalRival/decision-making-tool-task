import AbstractComponent from '~/core/models/abstract-component';
import BackButton from './back-button';
import styles from './control-panel-form.module.css';
import DurationInput from './duration-input';
import PickButton from './pick-button';
import ToggleSoundCheckbox from './toggle-sound-checkbox';

const DURATION_FIELD_NAME = 'duration';
const SOUND_FIELD_NAME = 'sound';

export default class ControlPanelForm extends AbstractComponent<'form'> {
  private readonly interactiveComponents = new Set<{ toggleDisabled: (value?: boolean) => void }>();

  constructor(
    private readonly props: {
      onSubmit: (props: { duration: string; sound: string }) => void;
      onSoundEnabledChange: (soundEnabled: boolean) => void;
      soundDefaultChecked: boolean;
    }
  ) {
    super('form', { className: styles.form });

    this.mount();
  }

  public toggleDisabledFormElements(value?: boolean): void {
    this.interactiveComponents.forEach((component) => component.toggleDisabled(value));
  }

  private mount(): void {
    const backButton = new BackButton();
    const soundCheckbox = new ToggleSoundCheckbox({
      name: SOUND_FIELD_NAME,
      defaultChecked: this.props.soundDefaultChecked,
      onchange: (event): void => {
        if (event.target instanceof HTMLInputElement) {
          this.props.onSoundEnabledChange(event.target.checked);
        }
      },
    });
    const durationInput = new DurationInput({ name: DURATION_FIELD_NAME });
    const pickButton = new PickButton();

    this.node.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(this.node);
      const duration = formData.get(DURATION_FIELD_NAME)?.toString();
      const sound = formData.get(SOUND_FIELD_NAME)?.toString();

      if (!duration || !sound) {
        throw new Error('duration or sound is not defined');
      }

      this.props.onSubmit({ duration, sound });
    });

    this.interactiveComponents.clear();
    [backButton, soundCheckbox, durationInput, pickButton].forEach((component) =>
      this.interactiveComponents.add(component)
    );

    this.replaceChildren(backButton, soundCheckbox, durationInput, pickButton);
  }
}
