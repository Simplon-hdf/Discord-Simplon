import { PromoCategory } from './promo-category';

export class CategoryTemplate {
  private readonly _id: string;
  private _name: string;
  private readonly _channels_id: List<string> = new List<string>();
  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get channelsId(): List<string> {
    return this._channels_id;
  }

  addChannel(id: string): void {
    this._channels_id.add(id);
  }

  removeChannel(id: string): void {
    this._channels_id.remove(id);
  }
}
