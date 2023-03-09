export class Permission {
  private readonly _id: number;
  private readonly _desc: string;
  private readonly _flag: string;
  private _state: boolean;

  constructor(id: number, desc: string, flag: string, state: boolean) {
    this._id = id;
    this._desc = desc;
    this._flag = flag;
    this._state = state;
  }

  get id(): number {
    return this._id;
  }

  get desc(): string {
    return this._desc;
  }
  get flag(): string {
    return this._flag;
  }

  get state(): boolean {
    return this._state;
  }

  set state(value: boolean) {
    this._state = value;
  }
}
