import PubSub from '~/utils/pubsub';

export default class WheelRotationService {
  private rotation = 0;

  private pubSub = new PubSub(() => this.get());

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

  public off = this.pubSub.off;

  public on = this.pubSub.on;

  public destroy = this.pubSub.destroy;
}
