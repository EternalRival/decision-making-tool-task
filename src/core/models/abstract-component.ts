import type ComponentProps from '~/core/models/component-props.type';
import type TagName from '~/core/models/tag-name.type';

type Appendable = Parameters<ParentNode['append']>[number];

export default abstract class AbstractComponent<T extends TagName = TagName> {
  readonly #node: HTMLElementTagNameMap[T];

  constructor(tagName: T, props?: ComponentProps<T>) {
    this.#node = Object.assign(document.createElement(tagName), props);
  }

  public get node(): HTMLElementTagNameMap[T] {
    return this.#node;
  }

  protected static readonly parseNode = (value: Appendable | AbstractComponent): Node | string =>
    value instanceof Node || typeof value === 'string' ? value : value.node;

  public append(...children: (Appendable | AbstractComponent)[]): void {
    this.node.append(...children.map(AbstractComponent.parseNode));
  }

  public replaceChildren(...children: (Appendable | AbstractComponent)[]): void {
    this.node.replaceChildren(...children.map(AbstractComponent.parseNode));
  }

  public remove(): void {
    this.node.remove();
  }
}
