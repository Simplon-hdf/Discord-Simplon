import {YamlParser} from "../utils/parsers/yaml-parser";
import {Routes} from "../utils/routes";
import axios from "axios";

export class User {
    protected readonly _Uuid: string;

    constructor(Uuid: string) {
        this._Uuid = Uuid;

    }

    public get id(): string {
        return this._Uuid;
    }


    /*public set promoUuId(promoUuId: string) {
        this._promoUuid = promoUuId;
        // TODO : faire requête POST pour inscrire en BDD
    }*/

    getRoles(): any {
        const routes = Routes.GET_ROLE_BY_USER_ID;

        let roleList = axios.get( routes + this._Uuid)
            .then( function(response: any) {
                return response;
            })
            .catch(function(error) {
                console.log('No learners found');
                return error.message;
            })
    }

}