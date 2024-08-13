const easing = {
  easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x ** 3 : 4 * x ** 3 - 12 * x ** 2 + 12 * x - 3;
  },
  easeInOutBack(x: number): number {
    const magnitude = 0.15;
    const y = magnitude * 1.525;

    return x < 0.5
      ? 4 * x ** 3 * y + 4 * x ** 3 - 2 * x ** 2 * y
      : 4 * x ** 3 * y + 4 * x ** 3 - 10 * x ** 2 * y - 12 * x ** 2 + 8 * x * y + 12 * x - 2 * y - 3;
  },
};

export function easeInOut(progress: number): number {
  return easing.easeInOutCubic(progress);
}
