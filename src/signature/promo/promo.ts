import {Routes} from "../utils/routes";
import {HttpUtils} from "../utils/http";


export class Promo {
    private promoId: string;

    constructor(promoId: string) {
        this.promoId = promoId;
    }


    async getLearners(): Promise<any> {
        let learnerList = await new HttpUtils().get(Routes.GET_USERS_BY_PROMO_ID, this.promoId)
        try {
            return learnerList.data;
        }
        catch(error) {
            console.log(learnerList.error.message)
            return 'fail'
        }
    }


    /*getTrainers(): void {
        let routes = 'placeholder'; //Insert Route
        let trainerList = axios.get( routes + this.promoUuId )
            .then( function(response: any) {
                return response;
            })
            .catch(function(error) {
                console.log('No trainers found');
                return error.message;
            })
    }*/

    /*async getCodeRequestStatus(): Promise<boolean>  {
        const routes = Routes.GET_CODE_REQUEST_STATUS // Insert Route here
        const request = new HttpUtils<boolean>().get(routes, this.promoUuId.toString())
        return request;
    }*/
}
