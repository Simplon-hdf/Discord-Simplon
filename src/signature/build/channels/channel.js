"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const yaml_parser_1 = require("../utils/parsers/yaml-parser");
class Channel {
    _uuid;
    static YamlConfig = new yaml_parser_1.YamlParser('./config.yml');
    constructor(id) {
        this._uuid = id;
    }
    get uuid() {
        return this._uuid;
    }
    SendConfirmation(channelId) {
        console.log(channelId);
        //TODO: Implement function.
    }
}
exports.Channel = Channel;
