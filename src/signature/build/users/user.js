"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    _Uuid;
    constructor(Uuid) {
        this._Uuid = Uuid;
    }
    get id() {
        return this._Uuid;
    }
}
exports.User = User;
