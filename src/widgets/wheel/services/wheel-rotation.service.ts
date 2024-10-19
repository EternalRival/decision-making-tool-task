import PubSub from '~/utils/pubsub';

export default class WheelRotationService {
  private rotation = 0;

  private readonly pubSub = new PubSub(() => this.get());

  public get(): number {
    return this.rotation;
  }

  public set(rotation: number): void {
    this.rotation = rotation;

    this.pubSub.emit();
  }

  public reset(): void {
    this.rotation = 0;

    this.pubSub.emit();
  }

  public off(...args: Parameters<typeof this.pubSub.off>): void {
    this.pubSub.off(...args);
  }

  public on(...args: Parameters<typeof this.pubSub.on>): void {
    this.pubSub.on(...args);
  }

  public destroy(): void {
    this.pubSub.destroy();
  }
}
