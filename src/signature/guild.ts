import {YamlParser} from "./utils/parsers/yaml-parser";
import {Routes} from "./utils/routes";
import {HttpUtils} from "./utils/http";

export class Guild {

    private readonly _id: number;
    private readonly _name: string;

// Ajouter les méthodes :
    // - SendPrivateMessage(id): void
    // - SendMessage(): void


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