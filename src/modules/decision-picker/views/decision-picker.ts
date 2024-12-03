import Component from '~/core/components/component';
import AbstractComponent from '~/core/models/abstract-component';
import { APP_NAME } from '~/core/models/constants';
import type StoredOptionsDTO from '~/core/models/stored-options.dto';
import OptionStorageService from '~/core/services/option-storage.service';
import ControlPanelForm from '../components/control-panel-form';
import styles from './decision-picker.module.css';
import SoundStorageService from '../service/sound-storage.service';

export default class DecisionPicker extends AbstractComponent {
  private readonly state = {
    soundEnabled: true,
  };

  private readonly optionStorageService = new OptionStorageService({
    onDataLoaded: (storedData: StoredOptionsDTO | null): void => {
      console.debug(storedData);
      /*  this.optionMapService.removeOptions();

      if (storedData) {
        this.optionIdService.setId(storedData.lastId);
        this.optionMapService.addOptions(storedData.list);
      } */
    },
  });

  private readonly soundStorageService = new SoundStorageService({
    onDataLoaded: (storedData: { soundEnabled: boolean } | null): void => {
      if (storedData) {
        this.state.soundEnabled = storedData.soundEnabled;
      }
    },
    getDataToSave: (): { soundEnabled: boolean } => this.state,
  });

  constructor() {
    super('main', { className: styles.main });

    this.mount();
  }

  public override remove(): void {
    this.handleBeforeUnmount();
    super.remove();
  }

  private handleBeforeMount(): void {
    this.optionStorageService.loadFromLS();
    this.soundStorageService.loadFromLS();
  }

  private handleBeforeUnmount(): void {
    this.soundStorageService.saveToLS();
  }

  private mount(): void {
    this.handleBeforeMount();

    const heading = new Component('h1', { className: styles.heading, textContent: APP_NAME, title: APP_NAME });

    const form = new ControlPanelForm({
      onSubmit: ({ duration, sound }): void => {
        console.debug({ duration, sound });
      },
      onSoundEnabledChange: (soundEnabled: boolean): void => {
        this.state.soundEnabled = soundEnabled;
      },
      soundDefaultChecked: this.state.soundEnabled,
    });

    const pickedOption = new Component('p', { className: styles.pickedOption, textContent: 'pickedOption' });

    const wheel = new Component('canvas', { className: styles.wheel, textContent: 'wheel' });

    this.replaceChildren(heading, form, pickedOption, wheel);
  }
}
