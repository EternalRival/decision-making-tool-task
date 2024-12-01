import ICON_URL from '~/assets/icons/icons.sprite.svg';

const NS = 'http://www.w3.org/2000/svg';

type IconName = 'play' | 'square-arrow-out-up-left' | 'timer' | 'volume-2' | 'volume-off' | 'x';

export default function SpriteIcon({ name }: { name: IconName }): SVGSVGElement {
  const svg = document.createElementNS(NS, 'svg');
  const use = document.createElementNS(NS, 'use');

  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
  use.setAttribute('href', `${ICON_URL}#${name}`);
  svg.append(use);

  return svg;
}
