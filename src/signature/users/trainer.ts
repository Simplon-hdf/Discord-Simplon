import {User} from "./user";
import {Routes} from "../utils/routes";
import {HttpUtils} from "../utils/http";

export class Trainer extends User {
    constructor(Uuid: string) {
        super(Uuid);
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

    async deactivateCodeRequest(promoId: string): Promise<any> {
        const deactivation = await new HttpUtils().get(Routes.CHANGE_STATUS, promoId)
        try {
            return deactivation
        }
        catch(error) {
            console.log(deactivation.error.message)
            return 'fail'
        }
    }
}