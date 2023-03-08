import {Guild} from "../guild";
import {Routes} from "./routes";
import axios from "axios";
import {ApiError} from "./exception/api-error";



export class HttpUtils{

    private readonly _urlBase: string;

    constructor() {
        this._urlBase = Guild.YamlConfig.get()['api-route-url'];
    }

    async get (route: Routes, args?: string): Promise<any>{
        return new Promise(async (resolve) => {
            const formattedRoute: string = args === undefined ? route : route.replace(/:(\w+)/,  args);
            const request = await axios.get(this._urlBase + formattedRoute);
            if(request.status === 404 || request.status === 500){
                throw new ApiError('API error on `GET` request. Error : ' + request.status);
            }

            resolve(request.data);

        })
    }

    async post (route: Routes, data: any, args?: string): Promise<any> {
        return new Promise(async (resolve) => {
            const formattedRoute: string = args === undefined ? route : route.replace(/:(\w+)/,  args);
            const request = await axios.post(this._urlBase + formattedRoute, data);

            if(request.status === 404 || request.status === 500){
                throw new ApiError('API error on `POST` request. Error : ' + request.status);
            }

            resolve(request.data);
        })

    }
}