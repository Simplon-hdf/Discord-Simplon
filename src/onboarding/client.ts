import { GuildsManager } from './guilds/guilds-manager';
import { CourseManager } from './courses/course-manager';
import { CategoryManager } from './channels/category/category-manager';
import { ChannelManager } from './channels/channel/channel-manager';
import { UserManager } from './users/user-manager';
import { Client } from 'discord.js';
import EventEmitter from 'events';

export class DiscordClient {
  private readonly _token?: string;
  private static instance?: DiscordClient;

  private readonly guildManager: GuildsManager;

  private readonly coursesManager: CourseManager;

  private readonly categoryManager: CategoryManager;

  private readonly channelManager: ChannelManager;

  private readonly userManager: UserManager;

  private client?: Client;

  private eventEmitter: EventEmitter;

  constructor(token?: string) {
    this.guildManager = new GuildsManager();
    this.coursesManager = new CourseManager();
    this.categoryManager = new CategoryManager();
    this.channelManager = new ChannelManager();
    this.userManager = new UserManager();
    this.eventEmitter = new EventEmitter();
    this._token = token;
  }

  static getInstance(token?: string): DiscordClient {
    if (!DiscordClient.instance || DiscordClient.instance._token !== token) {
      if (token === undefined) {
        DiscordClient.instance = new DiscordClient();
      }
      DiscordClient.instance = new DiscordClient(token);
    }
    return DiscordClient.instance;
  }

  getCoursesManager(): CourseManager {
    return this.coursesManager;
  }

  getGuildManager(): GuildsManager {
    return this.guildManager;
  }

  getCategoryManager(): CategoryManager {
    return this.categoryManager;
  }

  getChannelManager(): ChannelManager {
    return this.channelManager;
  }

  getUserManager(): UserManager {
    return this.userManager;
  }

  getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }
  getToken(): string | undefined {
    return this._token;
  }

  isInstanciated(): boolean {
    return DiscordClient.instance === undefined;
  }

  getClient(): Client | undefined {
    return this.client;
  }

  setClient(client: Client): void {
    this.client = client;
  }

  destroy(): void {
    DiscordClient.instance = undefined;
  }
}
