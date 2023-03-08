"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpUtils = void 0;
const guild_1 = require("../guild");
const axios_1 = __importDefault(require("axios"));
const api_error_1 = require("./exception/api-error");
class HttpUtils {
    _urlBase;
    constructor() {
        this._urlBase = guild_1.Guild.YamlConfig.get()['api-route-url'];
    }
    async get(route, args) {
        return new Promise(async (resolve) => {
            const formattedRoute = args === undefined ? route : route.replace(/:(\w+)/, args);
            const request = await axios_1.default.get(this._urlBase + formattedRoute);
            if (request.status === 404 || request.status === 500) {
                throw new api_error_1.ApiError('API error on `GET` request. Error : ' + request.status);
            }
            resolve(request.data);
        });
    }
    async post(route, data, args) {
        return new Promise(async (resolve) => {
            const formattedRoute = args === undefined ? route : route.replace(/:(\w+)/, args);
            const request = await axios_1.default.post(this._urlBase + formattedRoute, data);
            if (request.status === 404 || request.status === 500) {
                throw new api_error_1.ApiError('API error on `POST` request. Error : ' + request.status);
            }
            resolve(request.data);
        });
    }
}
exports.HttpUtils = HttpUtils;
