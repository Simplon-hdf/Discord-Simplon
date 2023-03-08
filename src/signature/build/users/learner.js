"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Learner = void 0;
const user_1 = require("./user");
const http_1 = require("../utils/http");
const routes_1 = require("../utils/routes");
class Learner extends user_1.User {
    constructor(learnerUuid) {
        super(learnerUuid);
    }
    async getCodeRequestStatus() {
        const codeRequestStatus = await new http_1.HttpUtils().get(routes_1.Routes.GET_CODE_REQUEST_STATUS, this._Uuid);
        try {
            return codeRequestStatus;
        }
        catch (error) {
            console.log(codeRequestStatus.error.message);
            return false;
        }
    }
    async hasReport() {
        const hasReport = await new http_1.HttpUtils().get(routes_1.Routes.GET_REPORT, this._Uuid);
        try {
            return hasReport;
        }
        catch (error) {
            console.log(hasReport.error.message);
            return false;
        }
    }
    async getTrainers() {
        const trainerList = await new http_1.HttpUtils().get(routes_1.Routes.GET_TRAINERS, this._Uuid);
        try {
            return trainerList;
        }
        catch (error) {
            console.log(trainerList.error.message);
            return 'fail';
        }
    }
    async codeRequest(trainerUuid) {
        const codeRequest = await new http_1.HttpUtils().post(routes_1.Routes.POST_CODE_REQUEST, {
            "trainerUuid": trainerUuid
        }, this._Uuid);
        try {
            return codeRequest;
        }
        catch (error) {
            console.log(codeRequest.error.message);
            return 'fail';
        }
    }
}
exports.Learner = Learner;
