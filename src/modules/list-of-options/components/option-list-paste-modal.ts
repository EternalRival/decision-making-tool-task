import Component from '~/core/components/component';
import UiButton from '~/core/components/ui-button';
import UiDialog from '~/core/components/ui-dialog';
import styles from './option-list-paste-modal.module.css';

const TEXTAREA_EXAMPLE_VALUE = `
title,1                 -> | title                 | 1 |
title with whitespace,2 -> | title with whitespace | 2 |
title , with , commas,3 -> | title , with , commas | 3 |
title with "quotes",4   -> | title with "quotes"   | 4 |
`.trim();

const TEXT_AREA_PLACEHOLDER_TEXT = `Paste a list of new options in a CSV-like format:\n\n${TEXTAREA_EXAMPLE_VALUE}`;

type Props = {
  onConfirm: (pasteData: [string, string][]) => void;
};

const CONFIRM_BUTTON_TEXT = 'Confirm';
const CANCEL_BUTTON_TEXT = 'Cancel';

export default class OptionListPasteModal extends UiDialog {
  constructor(private readonly props: Props) {
    super();

    this.mount();
  }

  private static parseFromCSV(csv?: string): [string, string][] {
    if (!csv) {
      return [];
    }

    return csv.split(/\n/).reduce<[string, string][]>((acc, line) => {
      const fields = /^(.*)[\t,]\s*(\d*)\s*$/.exec(line);

      if (fields && typeof fields[1] === 'string' && typeof fields[2] === 'string') {
        acc.push([fields[1].trim(), fields[2].trim()]);
      }

      return acc;
    }, []);
  }

  private mount(): void {
    const form = new Component('form', {
      className: styles.container,
      onsubmit: (event): void => {
        event.preventDefault();

        const formData = new FormData(form.node);

        const formDataTable = formData.get('table');
        const rawCSV = typeof formDataTable === 'string' ? formDataTable : '';

        this.props.onConfirm(OptionListPasteModal.parseFromCSV(rawCSV));

        void this.closeDialog();
      },
    });

    const textArea = new Component('textarea', {
      className: styles.textarea,
      rows: 12,
      cols: 64,
      placeholder: TEXT_AREA_PLACEHOLDER_TEXT,
      name: 'table',
    });

    const cancelButton = new UiButton({
      className: styles.cancel,
      textContent: CANCEL_BUTTON_TEXT,
      onclick: (): void => void this.closeDialog('Cancel'),
    });

    const confirmButton = new UiButton({
      className: styles.confirm,
      textContent: CONFIRM_BUTTON_TEXT,
    });

    form.append(textArea, cancelButton, confirmButton);
    this.append(form);
  }
}
