import Component from '~/core/components/component';
import AbstractComponent from '~/core/models/abstract-component';
import { APP_NAME, OPTIONS_STORAGE_KEY } from '~/core/models/constants';
import OptionDTO from '~/core/models/option.dto';
import ControlPanelForm from '../components/control-panel-form';
import OptionStorageService from '../service/option-storage.service';
import styles from './decision-picker.module.css';

export default class DecisionPicker extends AbstractComponent {
  private storageService = new OptionStorageService({
    storageKey: OPTIONS_STORAGE_KEY,
    isOptionDTOLike: OptionDTO.isOptionDTOLike,
    createOptionDTO: OptionDTO.create,
    onDataLoaded: (storedData: { list: OptionDTO[] } | null): void => {
      console.debug({ list: storedData?.list });
      /*  this.optionMapService.removeOptions();

      if (storedData) {
        this.optionIdService.setId(storedData.lastId);
        this.optionMapService.addOptions(storedData.list);
      } */
    },
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
    this.storageService.loadFromLS();
  }

  private handleBeforeUnmount(): void {
    void this;
  }

  private mount(): void {
    this.handleBeforeMount();

    const heading = new Component('h1', { className: styles.heading, textContent: APP_NAME, title: APP_NAME });

    const form = new ControlPanelForm();

    const pickedOption = new Component('p', { className: styles.pickedOption, textContent: 'pickedOption' });

    const wheel = new Component('canvas', { className: styles.wheel, textContent: 'wheel' });

    this.replaceChildren(heading, form, pickedOption, wheel);
  }
}
