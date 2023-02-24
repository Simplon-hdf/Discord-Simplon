import {YamlParser} from "../utils/parsers/yaml-parser";

export class User {
    private readonly _id: number;
    private readonly _name: string;

    static YamlConfig = new YamlParser('./config.yml');

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