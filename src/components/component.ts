type TagName = keyof HTMLElementTagNameMap;
type Props<T extends TagName> = Partial<HTMLElementTagNameMap[T]> | undefined;

export default class Component<T extends TagName = 'div'> {
  protected node: HTMLElementTagNameMap[T];

  constructor(tagName: T, props?: Props<T>) {
    this.node = Object.assign(document.createElement(tagName), props);
  }

  public getNode(): HTMLElementTagNameMap[T] {
    return this.node;
  }

  public remove({ onRemove }: { onRemove?: () => void } = {}): void {
    onRemove?.();
    this.getNode().remove();
  }

  public append(...children: { getNode: () => HTMLElementTagNameMap[TagName] }[]): void {
    children.forEach((child) => {
      this.node.append(child.getNode());
    });
  }

  public replaceChildren(...children: { getNode: () => HTMLElementTagNameMap[TagName] }[]): void {
    this.getNode().replaceChildren(...children.map((child) => child.getNode()));
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
}
