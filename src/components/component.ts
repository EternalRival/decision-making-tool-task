type TagName = keyof HTMLElementTagNameMap;
type Props<T extends TagName> = Partial<HTMLElementTagNameMap[T]>;

export class Component<T extends TagName = 'div'> {
  protected node: HTMLElementTagNameMap[T];

  constructor(tagName: T, props?: Props<T>) {
    this.node = Object.assign(document.createElement(tagName), props);
  }

  public getNode() {
    return this.node;
  }

  public remove() {
    this.getNode().remove();
  }

  public append<T extends TagName>(...children: Component<T>[]) {
    children.forEach((child) => this.node.append(child.getNode()));
  }

  public replaceChildren<T extends TagName>(...children: Component<T>[]) {
    this.node.replaceChildren(...children.map((child) => child.getNode()));
  }

  public setTextContent(text: string) {
    this.getNode().textContent = text;
  }
}
