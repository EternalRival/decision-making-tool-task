export default class OptionIdService {
  private currentId = 0;

  public getId(): number {
    return this.currentId;
  }

  public setId(newId: number): void {
    this.currentId = newId;
  }

  public resetId = (): void => this.setId(0);

  public getNextId(): number {
    const newId = this.getId() + 1;
    this.setId(newId);

    return this.getId();
  }
}
