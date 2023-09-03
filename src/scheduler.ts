/**
 * @licence Mikhail Nasyrov
 */
export type TaskScheduler<T> = Readonly<{
  isEmpty(): boolean;
  schedule(entry: T): void;
  execute(): void;
}>;

/**
 * @licence Mikhail Nasyrov
 */
export class MicrotaskScheduler<T> implements TaskScheduler<T> {
  private readonly queue = new Set<T>();

  constructor(private readonly action: (entry: T) => void) {}

  isEmpty = (): boolean => this.queue.size === 0;

  schedule = (entry: T): void => {
    const prevSize = this.queue.size;
    this.queue.add(entry);

    if (prevSize === 0) {
      Promise.resolve().then(() => this.execute());
    }
  };

  execute = (): void => {
    if (this.queue.size === 0) {
      return;
    }

    const list = [...this.queue];
    this.queue.clear();

    for (const entry of list) {
      this.action(entry);
    }
  };
}
