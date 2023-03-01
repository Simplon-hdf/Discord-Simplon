"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpUtils = void 0;
const axios_1 = __importDefault(require("axios"));
const guild_1 = require("../guild");
class HttpUtils {
    _urlBase;
    constructor() {
        this._urlBase = guild_1.Guild.YamlConfig.get()['api-route-url'];
    }
    async get(route, args) {
        const obj = args === undefined ? await axios_1.default.get(this._urlBase + route) : await axios_1.default.get(this._urlBase + route + '/' + args);
        try {
            return obj.data;
        }
        catch (Exception) {
            throw new Error('Object not corresponds to request');
        }
    }
}
exports.HttpUtils = HttpUtils;
