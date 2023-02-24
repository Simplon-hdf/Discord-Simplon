import {Config} from "./config";
import {YamlParser} from "./utils/parsers/yaml-parser";
import {Routes} from "./utils/Routes";
import {HttpUtils} from "./utils/http";

export class Guild {

  private readonly _id: number;
  private readonly _name: string;

  private readonly _config: Config;

  static YamlConfig = new YamlParser('./config.yml');

  // private readonly _config:
  constructor(id: number, name: string, config: Config) {
    this._id = id;
    this._name = name;
    this._config = config;
  }


  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get config(): Config {
    return this._config;
  }

}