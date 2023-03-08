import {Routes} from "../utils/routes";
import {HttpUtils} from "../utils/http";


export class Promo {
    private readonly promoId: string;

    constructor(promoId: string) {
        this.promoId = promoId;
    }
    async getLearners(): Promise<any> {
        let learnerList = await new HttpUtils().get(Routes.GET_USERS_BY_PROMO_ID, this.promoId)
        try {
            return learnerList;
        }
        catch(error) {
            console.log(learnerList.error.message)
            return 'fail'
        }
    }
}
