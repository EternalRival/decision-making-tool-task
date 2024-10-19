import soundIconSrc from '../assets/sound-icon.svg';

export default function getSoundIcon({ name }: { name: 'on' | 'off' }): string {
  return `<svg viewBox="0 0 24 24" width="24" height="24"><use href=${soundIconSrc}#${name} /></svg>`;
}
