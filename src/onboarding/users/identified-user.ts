import { User } from './user';

export class IdentifiedUser extends User {
  private readonly _fistname: string;
  private readonly _lastname: string;
  private readonly _email: string;
  private readonly _factory_name?: string;
  constructor(
    id: number,
    pseudo: string,
    fistname: string,
    lastname: string,
    email: string,
    factory_name: string,
  ) {
    super(id, pseudo);
    this._fistname = fistname;
    this._lastname = lastname;
    this._email = email;
    this._factory_name = factory_name;
  }

  get fistname(): string {
    return this._fistname;
  }

  get lastname(): string {
    return this._lastname;
  }

  get email(): string {
    return this._email;
  }

  get factory_name(): string | undefined {
    return this._factory_name;
  }
}
