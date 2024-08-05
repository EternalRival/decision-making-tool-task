export function loadJsonFromFile() {
  return new Promise((res) => {
    const file = document.createElement('input');
    file.type = 'file';
    file.accept = '.json';
    file.onchange = (e) => {
      if (e.target instanceof HTMLInputElement) {
        e.target.files?.item(0)?.text()?.then(res);
      }
    };
    file.click();
  });
}
