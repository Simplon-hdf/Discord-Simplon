import {User} from "./user";

export class Trainer extends User {
    constructor(Uuid: string, roleUuId: string,) {
        super(Uuid, roleUuId);
    }
    reportForgottenSignature(learnerUuid: string) {
        return learnerUuid;
    }

    deactivateCodeRequest(_promoUuid: string) {
        return _promoUuid;
    }

}