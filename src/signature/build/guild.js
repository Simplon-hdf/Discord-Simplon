"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
const yaml_parser_1 = require("./utils/parsers/yaml-parser");
const routes_1 = require("./utils/routes");
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
        /*let roleList = axios.get( routes + this._id)
            .then( function(response: any) {
                return response;
            })
            .catch(function(error) {
                console.log('No learners found');
                return error.message;
            })
    }*/
    }
}
exports.Guild = Guild;
