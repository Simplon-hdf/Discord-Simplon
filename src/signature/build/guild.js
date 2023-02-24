"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
const yaml_parser_1 = require("./utils/parsers/yaml-parser");
class Guild {
    _id;
    _name;
    // Ajouter les méthodes :
    // - SendPrivateMessage(id): void
    // - SendMessage(): void
    static YamlConfig = new yaml_parser_1.YamlParser('./config.yml');
    // private readonly _config:
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
}
exports.Guild = Guild;
