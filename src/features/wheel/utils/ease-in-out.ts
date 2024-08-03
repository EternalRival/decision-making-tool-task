export function easeInOut(progress: number): number {
  return progress < 0.5 ? 4 * progress ** 3 : 4 * (progress - 1) ** 3 + 1;
}
