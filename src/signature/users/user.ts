import {YamlParser} from "../utils/parsers/yaml-parser";
import {Routes} from "../utils/routes";
import axios from "axios";

export class User {
    protected readonly _Uuid: string;
    protected _roleUuid: string;

    constructor(Uuid: string, roleUuId: string) {
        this._Uuid = Uuid;
        this._roleUuid = roleUuId;

    }

    public get id(): string {
        return this._Uuid;
    }

    public getPromoUuId(): any {
        let routes = Routes.GET_PROMO_BY_USER_ID;
        let learnerList = axios.get( routes + this._Uuid)
            .then( function(response: any) {
                return response;
            })
            .catch(function(error) {
                console.log('No learners found');
                return error.message;
            })
    }


    public get roleUuId(): string {
        return this._roleUuid;
    }

    /*public set promoUuId(promoUuId: string) {
        this._promoUuid = promoUuId;
        // TODO : faire requête POST pour inscrire en BDD
    }*/

    public set roleUuId(roleUuId: string) {
        this._roleUuid = roleUuId;
    }


}