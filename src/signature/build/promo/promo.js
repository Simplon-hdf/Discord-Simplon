"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promo = void 0;
const routes_1 = require("../utils/routes");
const index_1 = __importDefault(require("axios/index"));
const http_1 = require("../utils/http");
class Promo {
    promoUuId;
    constructor(promoUuId) {
        this.promoUuId = promoUuId;
    }
    getLearners() {
        let routes = routes_1.Routes.GET_USERS_BY_PROMO_ID;
        let learnerList = index_1.default.get(routes + this.promoUuId)
            .then(function (response) {
            return response;
        })
            .catch(function (error) {
            console.log('No learners found');
            return error.message;
        });
    }
    getTrainers() {
        let routes = 'placeholder'; //Insert Route
        let trainerList = index_1.default.get(routes + this.promoUuId)
            .then(function (response) {
            return response;
        })
            .catch(function (error) {
            console.log('No trainers found');
            return error.message;
        });
    }
    async getCodeRequestStatus() {
        const routes = routes_1.Routes.GET_CODE_REQUEST_STATUS; // Insert Route here
        const request = new http_1.HttpUtils().get(routes, this.promoUuId.toString());
        return request;
    }
}
exports.Promo = Promo;
