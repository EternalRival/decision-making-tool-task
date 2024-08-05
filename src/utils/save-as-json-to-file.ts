export function saveAsJsonToFile({ data, fileName }: { data: unknown; fileName: string }): void {
  const a = document.createElement('a');
  a.download = `${fileName.replace(/(\.json)*$/, '')}.json`;
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));
  a.click();
}
