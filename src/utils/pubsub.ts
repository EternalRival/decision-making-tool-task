type Callback<T> = (value: T) => void;

type PS<T> = {
  emit: () => void;
  on: (callback: Callback<T>) => void;
  off: (callback: Callback<T>) => void;
  once: (callback: Callback<T>) => void;
};

export default class PubSub<T> implements PS<T> {
  constructor(private readonly getValue: () => T) {}

  private readonly listeners = new Set<Callback<T>>();

  public destroy = (): void => {
    this.listeners.clear();
  };

  public emit = (): void => {
    this.listeners.forEach((callback) => callback(this.getValue()));
  };

  public off = (callback: Callback<T>): void => {
    this.listeners.delete(callback);
  };

  public on = (callback: Callback<T>): void => {
    this.listeners.add(callback);
  };

  public once = (callback: Callback<T>): void => {
    const cb: Callback<T> = (value) => {
      callback(value);
      this.off(cb);
    };

    this.on(cb);
  };
}
