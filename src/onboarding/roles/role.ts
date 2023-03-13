export interface IRole {
  getRoleName(): string;
  getRoleColor(): string;
  getRoleUuid(): string;
  getGuildUuid(): string;
}

export class Role implements IRole {
  private readonly role_name: string;
  private readonly role_uuid: string;
  private readonly guild_uuid: string;

  private readonly role_color: string;

  constructor(
    role_name: string,
    role_uuid: string,
    guild_uuid: string,
    role_color: string,
  ) {
    this.role_name = role_name;
    this.role_uuid = role_uuid;
    this.guild_uuid = guild_uuid;
    this.role_color = role_color;
  }

  getRoleColor(): string {
    return this.role_color;
  }

  getRoleName(): string {
    return this.role_name;
  }

  getGuildUuid(): string {
    return this.guild_uuid;
  }

  getRoleUuid(): string {
    return this.role_uuid;
  }
}
