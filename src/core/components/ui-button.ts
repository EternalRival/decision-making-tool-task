import clsx from 'clsx';
import Button from '~/core/components/button';
import styles from './ui-button.module.css';

type ButtonParameters = ConstructorParameters<typeof Button>;

export default class UiButton extends Button {
  constructor(...buttonParameters: ButtonParameters) {
    const [props, ...parameters] = buttonParameters;

    super({ ...props, className: clsx(styles['uiButton'], props?.className) }, ...parameters);
  }
}
