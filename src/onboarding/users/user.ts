export class User {
  private readonly _id: number;
  private readonly _pseudo: string;

  constructor(id: number, pseudo: string) {
    this._id = id;
    this._pseudo = pseudo;
  }
  get id(): number {
    return this._id;
  }

  get pseudo(): string {
    return this._pseudo;
  }
}
