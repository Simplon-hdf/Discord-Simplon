import {Permission} from "../permission";

export class Channel {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _permission: List<Permission> = new List<Permission>();


  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }


  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get permission(): List<Permission> {
    return this._permission;
  }
  removePermission(perm: Permission): void {
    this._permission.remove(perm);
  }

}