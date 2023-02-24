"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainer = void 0;
const user_1 = require("./user");
class Trainer extends user_1.User {
    reportForgottenSignature(id) {
        return id;
    }
    deactivateCodeRequest(id) {
        return id;
    }
}
exports.Trainer = Trainer;
