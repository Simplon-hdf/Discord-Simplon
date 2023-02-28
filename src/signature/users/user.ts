import {YamlParser} from "../utils/parsers/yaml-parser";

export class User {
    protected readonly _Uuid: string;
    protected _roleUuid: string;
    protected _promoUuid: string;

    constructor(Uuid: string, roleUuId: string, promoUuId: string ) {
        this._Uuid = Uuid;
        this._roleUuid = roleUuId;
        this._promoUuid = promoUuId;
    }

    public get id(): string {
        return this._Uuid;
    }

    public get promoUuId(): string {
        return this._promoUuid;
    }

    public get roleUuId(): string {
        return this._roleUuid;
    }

    public set promoUuId(promoUuId: string) {
        this._promoUuid = promoUuId;
        // TODO : faire requête POST pour inscrire en BDD
    }

    public set roleUuId(roleUuId: string) {
        this._roleUuid = roleUuId;
    }


}