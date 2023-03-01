"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainer = void 0;
const user_1 = require("./user");
class Trainer extends user_1.User {
    constructor(Uuid, roleUuId, promoUuId) {
        super(Uuid, roleUuId, promoUuId);
    }
    reportForgottenSignature(learnerUuid) {
        return learnerUuid;
    }
    deactivateCodeRequest(_promoUuid) {
        return _promoUuid;
    }
}
exports.Trainer = Trainer;
