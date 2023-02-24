import {Permission} from "../../permission";

class PromoRole {
  private readonly _id: number;
  private _name: string;
  private _permission: List<Permission> = new List<Permission>();


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

  set name(value: string) {
    this._name = value;
  }

  get permission(): List<Permission> {
    return this._permission;
  }

  addPermission(perm: Permission) : void {
    this._permission.add(perm);
  }

  removePermssion(perm: Permission): void {
    this._permission.remove(perm);
  }

  set permission(value: List<Permission>) {
    this._permission = value;
  }
}