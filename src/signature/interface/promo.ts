import {Routes} from "../utils/routes";
import axios from "axios/index";
import {HttpUtils} from "../utils/http";


export class Promo {

    private codeRequestStatus: boolean;

    constructor(codeRequestStatus: boolean) {
        this.codeRequestStatus = codeRequestStatus;
    }


    getLearners(promoUuid: number): void {
        let routes = Routes.GET_USERS_BY_PROMO_ID
        let learnerList = axios.get( routes + promoUuid )
            .then( function(response: any) {
                return response;
            })
            .catch(function(error) {
                console.log('No learners found');
                return error.message;
            })
    }

    getTrainers(promoUuid: number): void {
        let routes = 'placeholder';//Insert Route
        let trainerList = axios.get( routes + promoUuid )
            .then( function(response: any) {
                return response;
            })
            .catch(function(error) {
                console.log('No trainers found');
                return error.message;
            })
    }

    async getCodeRequestStatus(promoUuid: number): Promise<boolean>  {
        const routes = Routes.GET_CODE_REQUEST_STATUS// Insert Route here
        const request = new HttpUtils<boolean>().get(routes, promoUuid.toString())
        return request;
    }
}
