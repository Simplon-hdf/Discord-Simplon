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
    codeRequest(trainerUuid) {
        return trainerUuid;
    }
}
exports.Learner = Learner;
