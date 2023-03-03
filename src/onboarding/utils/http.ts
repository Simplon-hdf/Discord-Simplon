import axios from "axios";
import {Guild} from "../guilds/guild";
import {Routes} from "./Routes";
import {ApiError} from './exceptions/api-error'

export class HttpUtils {

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
      const formattedRoute: string = route.replace(/:(\w+)/, (_match, group) => group.replace(/[a-zA-Z]/g, args));
      const request = await axios.post(this._urlBase + formattedRoute, data);

      if(request.status === 404 || request.status === 500){
        throw new ApiError('API error on `POST` request. Error : ' + request.status);
      }

      resolve(request.data);
    })

  }
}