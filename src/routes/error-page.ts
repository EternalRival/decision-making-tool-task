import Component from '~/core/components/component';
import UiButton from '~/core/components/ui-button';
import AbstractComponent from '~/core/models/abstract-component';
import Route from '../core/models/route.enum';
import HashRouter from '../core/router/hash-router';
import styles from './decision-picker.module.css';

const HEADING_TEXT = 'Something went wrong';
const BACK_BUTTON_TEXT = 'Back to main';

export default class ErrorPage extends AbstractComponent<'main'> {
  constructor() {
    super('main', { className: styles.main });

    this.mount();
  }

  private mount(): void {
    const heading = new Component('h1', { className: styles.heading, textContent: HEADING_TEXT, title: HEADING_TEXT });
    const backToMain = new UiButton({
      className: styles.backToMain,
      textContent: BACK_BUTTON_TEXT,
      onclick: (): void => HashRouter.navigate(Route.HOME),
    });

    this.replaceChildren(heading, backToMain);
  }
}
