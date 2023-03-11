class List<T> {
  private readonly items: Array<T>;

  constructor() {
    this.items = [];
  }

  size(): number {
    return this.items.length;
  }

  add(value: T): void {
    this.items.push(value);
  }

  remove(value: T): void {
    const index = this.indexOf(value);
    this.items.splice(index, 1);
  }

  get(index: number): T {
    return this.items[index];
  }

  indexOf(items: T): number {
    return this.items.indexOf(items);
  }
}
