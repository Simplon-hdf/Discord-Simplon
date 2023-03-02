"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainer = void 0;
const user_1 = require("./user");
const routes_1 = require("../utils/routes");
const http_1 = require("../utils/http");
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
    async getTrainerPromos() {
        const routes = routes_1.Routes.GET_PROMO_BY_USER_ID;
        const promoList = await new http_1.HttpUtils().get(routes_1.Routes.GET_PROMO_BY_USER_ID, this._Uuid);
        console.log(promoList.data);
    }
}
exports.Trainer = Trainer;
