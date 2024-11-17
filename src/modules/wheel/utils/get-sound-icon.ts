import ICON_URL from '~/assets/icons/sound-icon.sprite.svg';

const NS = 'http://www.w3.org/2000/svg';

export default function getSoundIcon({ name }: { name: 'on' | 'off' }): SVGSVGElement {
  const svg = document.createElementNS(NS, 'svg');
  const use = document.createElementNS(NS, 'use');

  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
  use.setAttribute('href', `${ICON_URL}#${name}`);
  svg.append(use);

  return svg;
}
