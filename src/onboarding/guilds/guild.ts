import {Config} from "../config/config";
import {YamlParser} from "../utils/parsers/yaml-parser";
import {Routes} from "../utils/Routes";
import {HttpUtils} from "../utils/http";

export interface IGuild {
  getGuildUuid(): string;
  getGuildName(): string;
  getMemberSize(): number;


}

export class Guild implements IGuild{

  private readonly guild_uuid: string;
  private readonly guild_name: string;
  private member_size: number;


  static YamlConfig = new YamlParser('./config.yml');

  // private readonly _config:
  constructor(guild_uuid: string, guild_name: string, member_size: number) {
    this.guild_uuid = guild_uuid;
    this.guild_name = guild_name;
    this.member_size = member_size;
  }


  getGuildUuid(): string {
    return this.guild_uuid;
  }

  getGuildName(): string {
    return this.guild_name;
  }


  getMemberSize(): number {
    return this.member_size;
  }
}