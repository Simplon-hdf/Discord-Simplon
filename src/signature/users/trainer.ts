import {User} from "./user";

export class Trainer extends User {
    constructor(Uuid: string, roleUuId: string, promoUuId: string ) {
        super(Uuid, roleUuId, promoUuId);
    }
    reportForgottenSignature(learnerUuid: string) {
        return learnerUuid;
    }

    deactivateCodeRequest(_promoUuid: string) {
        return _promoUuid;
    }
}