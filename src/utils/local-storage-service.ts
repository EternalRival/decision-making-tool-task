const prefix = '[er-wheel-of-fortune] ';

const withPrefix = (key: string) => `${prefix + key}`;

export const LocalStorageService = {
  get(key: string) {
    return JSON.parse(localStorage.getItem(withPrefix(key)) || 'null');
  },
  set(key: string, value: unknown) {
    localStorage.setItem(withPrefix(key), JSON.stringify(value));
  },
};

export const LSService = LocalStorageService;
