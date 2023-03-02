import {Routes} from "../utils/routes";
import axios from "axios/index";
import {HttpUtils} from "../utils/http";


export class Promo {
    private promoUuId: string;

    constructor(promoUuId: string) {
        this.promoUuId = promoUuId;
    }


    /*getLearners(): void {
        let routes = Routes.GET_USERS_BY_PROMO_ID
        let learnerList = axios.get( routes + this.promoUuId )
            .then( function(response: any) {
                return response;
            })
            .catch(function(error) {
                console.log('No learners found');
                return error.message;
            })
    }*/

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
