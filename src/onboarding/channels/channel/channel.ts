export interface IChannel {
  getUuid(): string;
  getName(): string;
  getParentId(): string | undefined;
}

export class Channel implements IChannel {
  private readonly _uuid: string;
  private readonly _name: string;
  private readonly _parentId?: string;

  constructor(uuid: string, name: string, parentId?: string) {
    this._uuid = uuid;
    this._name = name;
    this._parentId = parentId;
  }

  getUuid(): string {
    return this._uuid;
  }

  getName(): string {
    return this._name;
  }

  getParentId(): string | undefined {
    return this._parentId;
  }
}
