import axios from "axios";
import {Guild} from "../guild";
import {Routes} from "./routes";

export class HttpUtils<T> {

    private readonly _urlBase: string;

    constructor() {
        this._urlBase = Guild.YamlConfig.get()['api-route-url'];
    }

    async get (route: Routes, args?: string): Promise<T> {
        const obj = args === undefined ? await axios.get(this._urlBase + route) : await axios.get(this._urlBase + route + '/' + args);
        try{
            return obj.data as T;
        }catch (Exception) {
            throw new Error('Object not corresponds to request');
        }
    }
}