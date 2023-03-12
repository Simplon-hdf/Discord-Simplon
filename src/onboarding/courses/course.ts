export interface ICourse {
  getCourseName(): string;
  getRoleUuid(): string;
  getGuildUuid(): string;
}

export class Course implements ICourse {
  private readonly course_name: string;
  private readonly role_uuid: string;
  private readonly guild_uuid: string;

  constructor(course_name: string, role_uuid: string, guild_uuid: string) {
    this.course_name = course_name;
    this.role_uuid = role_uuid;
    this.guild_uuid = guild_uuid;
  }

  getCourseName(): string {
    return this.course_name;
  }

  getGuildUuid(): string {
    return this.guild_uuid;
  }

  getRoleUuid(): string {
    return this.role_uuid;
  }
}
