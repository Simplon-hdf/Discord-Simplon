"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
const yaml_parser_1 = require("./utils/parsers/yaml-parser");
const routes_1 = require("./utils/routes");
const index_1 = __importDefault(require("axios/index"));
class Guild {
    _id;
    // Ajouter les méthodes :
    // - SendPrivateMessage(id): void
    // - SendMessage(): void
    static YamlConfig = new yaml_parser_1.YamlParser('./config.yml');
    // private readonly _config:
    constructor(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
    getTrainerRole() {
        const routes = routes_1.Routes.GET_ROLE;
        let roleList = index_1.default.get(routes + this._id)
            .then(function (response) {
            return response;
        })
            .catch(function (error) {
            console.log('No learners found');
            return error.message;
        });
    }
}
exports.Guild = Guild;
