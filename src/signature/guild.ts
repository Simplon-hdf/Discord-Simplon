import {YamlParser} from "./utils/parsers/yaml-parser";
import {Routes} from "./utils/routes";
import {HttpUtils} from "./utils/http";

export class Guild {

    private readonly _id: string;

// Ajouter les méthodes :
    // - SendPrivateMessage(id): void
    // - SendMessage(): void


    static YamlConfig = new YamlParser('./config.yml');

    // private readonly _config:
    constructor(id: string) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

    getTrainerRole(): any {
        const routes = Routes.GET_ROLE;


        /*let roleList = axios.get( routes + this._id)
            .then( function(response: any) {
                return response;
            })
            .catch(function(error) {
                console.log('No learners found');
                return error.message;
            })
    }*/

}}