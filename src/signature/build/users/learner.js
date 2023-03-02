"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Learner = void 0;
const user_1 = require("./user");
class Learner extends user_1.User {
    constructor(Uuid) {
        super(Uuid);
    }
    codeRequest(trainerUuid) {
        return trainerUuid;
    }
}
exports.Learner = Learner;
