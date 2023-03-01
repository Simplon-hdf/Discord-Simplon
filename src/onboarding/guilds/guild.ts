import {Config} from "../config/config";
import {YamlParser} from "../utils/parsers/yaml-parser";
import {Routes} from "../utils/Routes";
import {HttpUtils} from "../utils/http";

interface IGuild {
  id: number;
  name: string;
}

export class Guild {

  private readonly _id: number;
  private readonly _name: string;


  static YamlConfig = new YamlParser('./config.yml');

  // private readonly _config:
  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }


  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

}