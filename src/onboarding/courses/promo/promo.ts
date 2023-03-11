import { PromoRole } from './promo-role';
import { PromoCategory } from '../../channels/category/promo/promo-category';

export class Promo {
  private readonly _id: number;
  private _name: string;
  private _factory: string;
  private readonly _categoryId: string;
  private _trainersIds: List<number> = new List<number>();
  private _learnersIds: List<number> = new List<number>();
  private _startDate: Date;
  private _endDate: Date;
  private _promoCategory: PromoCategory;

  private _promoRole: PromoRole;

  constructor(
    id: number,
    name: string,
    factory: string,
    categoryId: string,
    startDate: Date,
    endDate: Date,
    promoCategory: PromoCategory,
    promoRole: PromoRole,
  ) {
    this._id = id;
    this._name = name;
    this._factory = factory;
    this._categoryId = categoryId;
    this._startDate = startDate;
    this._endDate = endDate;
    this._promoCategory = promoCategory;
    this._promoRole = promoRole;
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

  get factory(): string {
    return this._factory;
  }

  set factory(value: string) {
    this._factory = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  /**
   * Permet d'arrêter la promo si elle est en cours.
   */
  end(): void {}

  get categoryId(): string {
    return this._categoryId;
  }

  get trainersIds(): List<number> {
    return this._trainersIds;
  }

  set trainersIds(value: List<number>) {
    this._trainersIds = value;
  }

  set learnersIds(value: List<number>) {
    this._learnersIds = value;
  }

  addTrainer(id: number): void {
    this._trainersIds.add(id);
  }

  removeTrainer(id: number): void {
    this._trainersIds.remove(id);
  }

  getLearnersIds(): List<number> {
    return this._learnersIds;
  }

  addLearner(id: number): void {
    this._learnersIds.add(id);
  }

  removeLearner(id: number): void {
    this._learnersIds.remove(id);
  }

  get promoCategory(): PromoCategory {
    return this._promoCategory;
  }

  get promoRole(): PromoRole {
    return this._promoRole;
  }
}
