import { YamlParser } from "./utils/parsers/yaml-parser";

export class Guild {
  private readonly _id: string;

  static YamlConfig = new YamlParser("./config.yml");

  
  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }
}
