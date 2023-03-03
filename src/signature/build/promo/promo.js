"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promo = void 0;
const routes_1 = require("../utils/routes");
const http_1 = require("../utils/http");
class Promo {
    promoId;
    constructor(promoId) {
        this.promoId = promoId;
    }
    async getLearners() {
        let learnerList = await new http_1.HttpUtils().get(routes_1.Routes.GET_USERS_BY_PROMO_ID, this.promoId);
        try {
            return learnerList;
        }
        catch (error) {
            console.log(learnerList.error.message);
            return 'fail';
        }
    }
}
exports.Promo = Promo;
