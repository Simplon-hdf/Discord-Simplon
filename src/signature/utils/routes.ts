export enum Routes {
    GET_USER_BY_ID = '/guilds/config/',
    GET_USERS_BY_PROMO_ID  = '/signature/find/promo/:uuid',

    GET_CODE_REQUEST_STATUS = '/signature/signature/reportStatus/:learnerUuid',

    GET_PROMO_BY_USER_ID = '/signature/find/promo/trainer/:uuid',

    GET_ROLE_BY_USER_ID = '/find/role/user/:uuid',

    GET_ROLE = 'placeholder',

    GET_REPORT = 'signature/report/:learnerUuid',
}