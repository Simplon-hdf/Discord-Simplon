export interface IChannel {
  getUuid(): string;
  getName(): string;

  getParentId(): string | undefined;

  getGuildId(): string;
}

export class Channel implements IChannel {
  private readonly channel_uuid: string;
  private readonly channel_name: string;
  private readonly category_uuid?: string | undefined;
  private readonly id_guilds: string;

  constructor(
    channel_uuid: string,
    channel_name: string,
    id_guilds: string,
    category_uuid?: string | undefined,
  ) {
    this.channel_uuid = channel_uuid;
    this.channel_name = channel_name;
    this.category_uuid = category_uuid;
    this.id_guilds = id_guilds;
  }

  getUuid(): string {
    return this.channel_uuid;
  }

  getName(): string {
    return this.channel_name;
  }

  getParentId(): string | undefined {
    return this.category_uuid;
  }

  getGuildId(): string {
    return this.id_guilds;
  }
}
