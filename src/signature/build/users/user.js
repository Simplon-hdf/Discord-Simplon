"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const routes_1 = require("../utils/routes");
const axios_1 = __importDefault(require("axios"));
class User {
    _Uuid;
    constructor(Uuid) {
        this._Uuid = Uuid;
    }
    get id() {
        return this._Uuid;
    }
    /*public set promoUuId(promoUuId: string) {
        this._promoUuid = promoUuId;
        // TODO : faire requête POST pour inscrire en BDD
    }*/
    getRoles() {
        const routes = routes_1.Routes.GET_ROLE_BY_USER_ID;
        let roleList = axios_1.default.get(routes + this._Uuid)
            .then(function (response) {
            return response;
        })
            .catch(function (error) {
            console.log('No learners found');
            return error.message;
        });
    }
}
exports.User = User;
