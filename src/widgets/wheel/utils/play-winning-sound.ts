import winningSoundSrc from '../assets/ta-da.mp3';

const audio = Object.assign(new Audio(winningSoundSrc), { volume: 0.5 });

export default function playWinningSound(): Promise<void> {
  audio.currentTime = 0;
  return audio.play();
}
