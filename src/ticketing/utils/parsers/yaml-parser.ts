import * as fs from "fs";
import YAML from 'yaml';

export class YamlParser {
    private readonly _path: string;


    constructor(path: string) {
        this._path = path;
    }

    get path(): string {
        return this._path;
    }

    get() : any{
        return YAML.parse(fs.readFileSync(this._path, 'utf-8'));
    }
}