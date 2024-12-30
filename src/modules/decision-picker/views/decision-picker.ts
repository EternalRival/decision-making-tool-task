import Component from '~/core/components/component';
import AbstractComponent from '~/core/models/abstract-component';
import { APP_NAME, SLICE_LIST_MIN_LENGTH } from '~/core/models/constants';
import OptionDTO from '~/core/models/option.dto';
import Route from '~/core/models/route.enum';
import type StoredOptionsDTO from '~/core/models/stored-options.dto';
import HashRouter from '~/core/router/hash-router';
import OptionStorageService from '~/core/services/option-storage.service';
import animate from '~/core/utils/animate';
import easeInOut from '~/core/utils/ease-in-out';
import getRandomNumber from '~/core/utils/get-random-number';
import ControlPanelForm from '../components/control-panel-form';
import PickedOption from '../components/picked-option';
import WheelCanvas from '../components/wheel-canvas';
import OptionSliceListService from '../service/option-slice-list.service';
import SoundStorageService from '../service/sound-storage.service';
import playTaDaSound from '../utils/play-ta-da-sound';
import styles from './decision-picker.module.css';

export default class DecisionPicker extends AbstractComponent {
  private readonly state = {
    soundEnabled: true,
  };

  private readonly optionSliceListService = new OptionSliceListService();

  private readonly optionStorageService = new OptionStorageService({
    onDataLoaded: (storedData: StoredOptionsDTO | null): void => {
      const filteredStoredData = storedData?.list.filter(OptionDTO.isOptionDTOValid);

      if (filteredStoredData && filteredStoredData.length >= SLICE_LIST_MIN_LENGTH) {
        this.optionSliceListService.setOptionSliceList(filteredStoredData.toSorted(() => getRandomNumber(-1, 1)));

        return;
      }

      HashRouter.navigate(Route.HOME);
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

    if (this.optionSliceListService.isEmpty) {
      return;
    }

    const heading = new Component('h1', { className: styles.heading, textContent: APP_NAME, title: APP_NAME });

    const pickedOption = new PickedOption();

    const wheel = new WheelCanvas({ optionSliceList: this.optionSliceListService.getOptionSlices() });

    const controlPanelForm = new ControlPanelForm({
      onSubmit: ({ duration: durationString, sound }): void => {
        const duration = Number(durationString);

        controlPanelForm.toggleDisabledFormElements(true);
        pickedOption.togglePickedState(false);

        const targetRotationOffset = 2 * Math.PI * Math.random();

        const fullTurnsRotation = duration * 2 * Math.PI;
        const targetRotation = fullTurnsRotation + targetRotationOffset;

        animate({
          duration,
          easingFn: easeInOut,
          onFrameChange: (progress) => {
            const rotation = progress * targetRotation;
            wheel.draw({ rotation });
            pickedOption.setTextContent(this.optionSliceListService.getTitleByRadian(rotation));
          },
          onFinish: () => {
            wheel.draw({ rotation: targetRotation });

            controlPanelForm.toggleDisabledFormElements(false);
            pickedOption.togglePickedState(true);

            if (sound) {
              void playTaDaSound();
            }
          },
        });
      },
      onSoundEnabledChange: (soundEnabled: boolean): void => {
        this.state.soundEnabled = soundEnabled;
      },
      soundDefaultChecked: this.state.soundEnabled,
    });

    wheel.draw({ rotation: 0 });

    this.replaceChildren(heading, controlPanelForm, pickedOption, wheel);
  }
}
