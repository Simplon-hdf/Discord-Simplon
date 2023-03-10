"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var Routes;
(function (Routes) {
    Routes["GET_USERS_BY_PROMO_ID"] = "/signature/find/promo/:uuid";
    Routes["GET_CODE_REQUEST_STATUS"] = "/signature/signature/reportStatus/:learnerUuid";
    Routes["GET_PROMO_BY_USER_ID"] = "/signature/find/promo/trainer/:uuid";
    Routes["GET_REPORT"] = "/signature/report/:learnerUuid";
    Routes["GET_TRAINERS"] = "/signature/find/trainer/:uuid";
    Routes["POST_CODE_REQUEST"] = "/signature/codeRequest/:learnerUuid";
    Routes["CHANGE_STATUS"] = "/signature/codeRequest/changeStatus/:promoId";
})(Routes = exports.Routes || (exports.Routes = {}));
