import soundOffIconSrc from '../assets/sound-off.svg?raw';
import soundOnIconSrc from '../assets/sound-on.svg?raw';

export default function getSoundIcon({ isMuted }: { isMuted: boolean }): string {
  return isMuted ? soundOffIconSrc : soundOnIconSrc;
}
