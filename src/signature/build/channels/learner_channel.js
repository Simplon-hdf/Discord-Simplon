"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerChannel = void 0;
const yaml_parser_1 = require("../utils/parsers/yaml-parser");
class TrainerChannel {
    _learnersList;
    static YamlConfig = new yaml_parser_1.YamlParser('./config.yml');
    constructor(learnersList) {
        this._learnersList = learnersList;
    }
}
exports.TrainerChannel = TrainerChannel;
