export interface ICategory {
  getGuildUuid(): string;
  getCategoryUuid(): string;
  getCategoryName(): string;
}

export class Category implements ICategory {
  private readonly guild_uuid: string;
  private readonly category_uuid: string;
  private readonly category_name: string;

  constructor(
    guild_uuid: string,
    category_uuid: string,
    category_name: string,
  ) {
    this.guild_uuid = guild_uuid;
    this.category_uuid = category_uuid;
    this.category_name = category_name;
  }

  getGuildUuid(): string {
    return this.guild_uuid;
  }

  getCategoryUuid(): string {
    return this.category_uuid;
  }

  getCategoryName(): string {
    return this.category_name;
  }
}
