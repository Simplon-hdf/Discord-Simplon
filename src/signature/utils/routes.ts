export enum Routes {

    GET_USERS_BY_PROMO_ID  = '/signature/find/promo/:uuid',

    GET_CODE_REQUEST_STATUS = '/signature/signature/reportStatus/:learnerUuid',

    GET_PROMO_BY_USER_ID = '/signature/find/promo/trainer/:uuid',

    GET_REPORT = '/signature/report/:learnerUuid',

    GET_TRAINERS = '/signature/find/trainer/:uuid',

    POST_CODE_REQUEST = '/signature/codeRequest/:learnerUuid',

    DEACTIVATE = 'placeholder',
}


