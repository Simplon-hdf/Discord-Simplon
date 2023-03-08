import {YamlParser} from "../utils/parsers/yaml-parser";
import {Routes} from "../utils/routes";
import axios from "axios";

export class User {
    protected readonly _Uuid: string;

    constructor(Uuid: string) {
        this._Uuid = Uuid;

    }

    public get id(): string {
        return this._Uuid;
    }
}