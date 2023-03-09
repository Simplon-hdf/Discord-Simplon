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
    async getTrainerPromos() {
        const promoList = await new http_1.HttpUtils().get(routes_1.Routes.GET_PROMO_BY_USER_ID, this._Uuid);
        try {
            return promoList.data;
        }
        catch (error) {
            console.log(promoList.error.message);
            return 'fail';
        }
    }
    async deactivateCodeRequest() {
        const deactivation = await new http_1.HttpUtils().get(routes_1.Routes.DEACTIVATE, this._Uuid);
        try {
            return deactivation;
        }
        catch (error) {
            console.log(deactivation.error.message);
            return 'fail';
        }
    }
}
exports.Trainer = Trainer;
