"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var Routes;
(function (Routes) {
    Routes["GET_USER_BY_ID"] = "/guilds/config/";
    Routes["GET_USERS_BY_PROMO_ID"] = "/signature/find/promo/:uuid";
    Routes["GET_CODE_REQUEST_STATUS"] = "/signature/signature/reportStatus/:learnerUuid";
    Routes["GET_PROMO_BY_USER_ID"] = "/signature/find/promo/trainer/:uuid";
    Routes["GET_ROLE_BY_USER_ID"] = "/find/role/user/:uuid";
    Routes["GET_ROLE"] = "placeholder";
    Routes["GET_REPORT"] = "/signature/report/:learnerUuid";
})(Routes = exports.Routes || (exports.Routes = {}));
