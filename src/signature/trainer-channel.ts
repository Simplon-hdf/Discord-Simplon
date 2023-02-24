import {YamlParser} from "./utils/parsers/yaml-parser";
import {Channel} from "./channel";
import {Learner} from "./learner";
import axios from "axios";
import {Routes} from "./utils/routes";



export class TrainerChannel extends Channel {

    private readonly _isCodeRequestSendable: boolean;

    static YamlConfig = new YamlParser('./config.yml');

    constructor(isCodeRequestSendable: boolean, name: string, id: number) {
        super(id, name);
        this._isCodeRequestSendable = isCodeRequestSendable;
    }

    // Add methods:
        // - selectLearners(id): void
        // - sendConfirmation(): void
        // - get_trainers(): array

    selectLearners(id: number): void {
        let routes = Routes.GET_USERS_BY_PROMO_ID
        let learnerList = axios.get( routes + id )
            .then( function(response: any) {
                return response;
            })
            .catch(function(error) {
                console.log('No learners found');
                return error.message;
            })
    }

}