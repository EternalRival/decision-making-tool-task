const audio = Object.assign(new Audio('/assets/ta-da.mp3'), { volume: 0.5 });

export default function playWinningSound(): Promise<void> {
  audio.currentTime = 0;
  return audio.play();
}
