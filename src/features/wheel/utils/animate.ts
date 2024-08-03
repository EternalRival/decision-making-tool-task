import { clampValue } from './clamp-value';

export function animate({
  duration,
  drawFn,
  easingFn,
  onFinish,
}: {
  duration: number;
  drawFn: (progress: number) => void;
  easingFn: (progress: number) => number;
  onFinish: () => void;
}) {
  const start = performance.now();

  const callback: FrameRequestCallback = (time) => {
    const timeProgress = clampValue(0, (time - start) / (duration * 1000), 1);

    const animationProgress = easingFn(timeProgress);

    drawFn(animationProgress);

    if (timeProgress < 1) {
      requestAnimationFrame(callback);
    } else {
      onFinish();
    }
  };

  requestAnimationFrame(callback);
}
