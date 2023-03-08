import {User} from "./user";
import {Routes} from "../utils/routes";
import {HttpUtils} from "../utils/http";

export class Trainer extends User {
    constructor(Uuid: string) {
        super(Uuid);
    }

    deactivateCodeRequest(_promoUuid: string) {
        return _promoUuid;
    }

    async getTrainerPromos(): Promise<any> {
        const promoList =  await new HttpUtils().get(Routes.GET_PROMO_BY_USER_ID, this._Uuid)
        try {
            return promoList.data;
        }
        catch (error) {
            console.log(promoList.error.message)
            return 'fail'
        }
    }
}