import {YamlParser} from "./utils/parsers/yaml-parser";
import {Routes} from "./utils/routes";
import {HttpUtils} from "./utils/http";

export class Guild {

    private readonly _id: string;


    static YamlConfig = new YamlParser('./config.yml');

    // private readonly _config:
    constructor(id: string) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

}