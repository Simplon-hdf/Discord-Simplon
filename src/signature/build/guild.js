"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
const yaml_parser_1 = require("./utils/parsers/yaml-parser");
class Guild {
    _id;
    static YamlConfig = new yaml_parser_1.YamlParser('./config.yml');
    // private readonly _config:
    constructor(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
}
exports.Guild = Guild;
