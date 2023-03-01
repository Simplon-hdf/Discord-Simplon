"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    _Uuid;
    _roleUuid;
    _promoUuid;
    constructor(Uuid, roleUuId, promoUuId) {
        this._Uuid = Uuid;
        this._roleUuid = roleUuId;
        this._promoUuid = promoUuId;
    }
    get id() {
        return this._Uuid;
    }
    get promoUuId() {
        return this._promoUuid;
    }
    get roleUuId() {
        return this._roleUuid;
    }
    set promoUuId(promoUuId) {
        this._promoUuid = promoUuId;
        // TODO : faire requête POST pour inscrire en BDD
    }
    set roleUuId(roleUuId) {
        this._roleUuid = roleUuId;
    }
}
exports.User = User;
