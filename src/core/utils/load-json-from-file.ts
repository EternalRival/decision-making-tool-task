export default function loadJsonFromFile(): Promise<unknown> {
  return new Promise((res) => {
    const file = document.createElement('input');
    file.type = 'file';
    file.accept = '.json';
    file.onchange = (e): void => {
      if (e.target instanceof HTMLInputElement) {
        e.target.files
          ?.item(0)
          ?.text()
          .then(res)
          .catch((error: unknown) => {
            console.error(error);
          });
      }
    };

    file.click();
  });
}
