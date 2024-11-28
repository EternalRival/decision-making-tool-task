export default function loadJsonFromFile(): Promise<unknown> {
  return new Promise((res) => {
    const file = document.createElement('input');
    file.type = 'file';
    file.accept = '.json';
    file.onchange = (event): void => {
      if (event.target instanceof HTMLInputElement) {
        void event.target.files?.item(0)?.text().then(res);
      }
    };

    file.click();
  });
}
