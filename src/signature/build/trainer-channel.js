"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerChannel = void 0;
const yaml_parser_1 = require("./utils/parsers/yaml-parser");
const channel_1 = require("./channel");
const axios_1 = __importDefault(require("axios"));
const routes_1 = require("./utils/routes");
class TrainerChannel extends channel_1.Channel {
    _isCodeRequestSendable;
    static YamlConfig = new yaml_parser_1.YamlParser('./config.yml');
    constructor(isCodeRequestSendable, name, id) {
        super(id, name);
        this._isCodeRequestSendable = isCodeRequestSendable;
    }
    // Add methods:
    // - selectLearners(id): void
    // - sendConfirmation(): void
    // - get_trainers(): array
    selectLearners(id) {
        let routes = routes_1.Routes.GET_USERS_BY_PROMO_ID;
        let learnerList = axios_1.default.get(routes + id)
            .then(function (response) {
            return response;
        })
            .catch(function (error) {
            console.log('No learners found');
            return error.message;
        });
    }
}
exports.TrainerChannel = TrainerChannel;
