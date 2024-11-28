type TagName = keyof HTMLElementTagNameMap;

type Props<T extends TagName> = Partial<HTMLElementTagNameMap[T]> | undefined;

type ComponentLike = { getNode: () => Node };

type Appendable = Parameters<ParentNode['append']>[number];

export default class Component<T extends TagName = 'div'> implements ComponentLike {
  protected node: HTMLElementTagNameMap[T];

  constructor(tagName: T, props?: Props<T>) {
    this.node = Object.assign(document.createElement(tagName), props);
  }

  private static readonly parseNode = (value: Appendable | ComponentLike): Node | string =>
    value instanceof Node || typeof value === 'string' ? value : value.getNode();

  public getNode(): HTMLElementTagNameMap[T] {
    return this.node;
  }

  public remove({ onRemove }: { onRemove?: () => void } = {}): void {
    onRemove?.();
    this.getNode().remove();
  }

  public append(...children: (Appendable | ComponentLike)[]): void {
    this.getNode().append(...children.map(Component.parseNode));
  }

  public replaceChildren(...children: (Appendable | ComponentLike)[]): void {
    this.getNode().replaceChildren(...children.map(Component.parseNode));
  }

  public setTextContent(text: string): void {
    this.getNode().textContent = text;
  }

  public addClass(className: string): void {
    this.getNode().classList.add(className);
  }

  public removeClass(className: string): void {
    this.getNode().classList.remove(className);
  }

  public toggleClass(className: string, force?: boolean): void {
    this.getNode().classList.toggle(className, force);
  }

  public toggleInert(force?: boolean): void {
    const node = this.getNode();
    node.inert = force ?? !node.inert;
  }
}
