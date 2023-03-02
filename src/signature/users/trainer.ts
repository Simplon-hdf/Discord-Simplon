import {User} from "./user";
import {Routes} from "../utils/routes";
import axios from "axios";

export class Trainer extends User {
    constructor(Uuid: string) {
        super(Uuid);
    }
    reportForgottenSignature(learnerUuid: string) {
        return learnerUuid;
    }

    deactivateCodeRequest(_promoUuid: string) {
        return _promoUuid;
    }

    getTrainerPromos(): any {
        const routes = Routes.GET_PROMO_BY_USER_ID;

        let learnerList = axios.get( routes + this._Uuid)
            .then( function(response: any) {
                return response;
            })
            .catch(function(error) {
                console.log('No learners found');
                return error.message;
            })
    }

}