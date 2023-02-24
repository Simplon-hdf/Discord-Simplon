"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const yaml_parser_1 = require("./utils/parsers/yaml-parser");
class User {
    _id;
    _name;
    static YamlConfig = new yaml_parser_1.YamlParser('./config.yml');
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
exports.User = User;
