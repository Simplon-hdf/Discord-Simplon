"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainer = void 0;
const user_1 = require("./user");
const routes_1 = require("../utils/routes");
const axios_1 = __importDefault(require("axios"));
class Trainer extends user_1.User {
    constructor(Uuid) {
        super(Uuid);
    }
    reportForgottenSignature(learnerUuid) {
        return learnerUuid;
    }
    deactivateCodeRequest(_promoUuid) {
        return _promoUuid;
    }
    getTrainerPromos() {
        const routes = routes_1.Routes.GET_PROMO_BY_USER_ID;
        let learnerList = axios_1.default.get(routes + this._Uuid)
            .then(function (response) {
            return response;
        })
            .catch(function (error) {
            console.log('No learners found');
            return error.message;
        });
    }
}
exports.Trainer = Trainer;
