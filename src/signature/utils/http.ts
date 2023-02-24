import axios from "axios";
import {Guild} from "../guild";
import {Routes} from "./routes";

export class HttpUtils<T> {

    private readonly _urlBase: string;

    constructor() {
        this._urlBase = Guild.YamlConfig.get()['api-route-url'];
    }

    async get (route: Routes): Promise<T> {
        const obj = await axios.get(this._urlBase + route);

        try{
            return obj as T;
        }catch (Exception) {
            throw new Error('Object not corresponds to request');
        }
    }
}