import { GuildsManager } from './guilds/guilds-manager';
import { CourseManager } from './courses/course-manager';

export class DiscordClient {
  private readonly _token: string;
  private static instance?: DiscordClient;

  private readonly guildManager: GuildsManager;

  private readonly coursesManager: CourseManager;

  constructor(token: string) {
    this.guildManager = new GuildsManager();
    this.coursesManager = new CourseManager();
    this._token = token;
  }

  static getInstance(token: string): DiscordClient {
    if (!DiscordClient.instance || DiscordClient.instance._token !== token) {
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

  getToken(): string {
    return this._token;
  }

  destroy(): void {
    DiscordClient.instance = undefined;
  }
}
