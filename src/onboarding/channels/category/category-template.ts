import {PromoCategory} from "./promo-category";

export class CategoryTemplate {

  private readonly _id: number;
  private _name: string;
  private readonly _channels_id: List<number> = new List<number>();
  private readonly _promoCategory: PromoCategory;

  constructor(id: number, name: string, promoCategory: PromoCategory) {
    this._id = id;
    this._name = name;
    this._promoCategory = promoCategory;
  }


  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get promoCategory(): PromoCategory {
    return this._promoCategory;
  }

  get channelsId(): List<number> {
    return this._channels_id;
  }

  addChannel(id: number) : void{
    this._channels_id.add(id)
  }

  removeChannel(id: number) : void {
    this._channels_id.remove(id);
  }
}