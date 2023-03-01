import axios from "axios";
import {Guild} from "../guilds/guild";
import {Routes} from "./Routes";
import {ApiError} from './exceptions/api-error'


export class HttpUtils{

  private readonly _urlBase: string;

  constructor() {
    this._urlBase = Guild.YamlConfig.get()['api-route-url'];
  }

  async get (route: Routes, args?: string): Promise<any>{
    const formattedRoute: string = route.replace(/:(\w+)/, (_match, group) => group.replace(/[a-zA-Z]/g, args));
    const obj = await axios.get(this._urlBase + formattedRoute);
    try {
      return JSON.parse(obj.data);
    }catch (err) {
      if(err instanceof ApiError) {
        throw new ApiError('Recieved data is not JSON');
      }
      throw new ApiError('Request error code ' + obj.status + " : " + route.toString());
      process.exit(0);
    }
  }

  async post (route: Routes, data: any, args?: string): Promise<any> {
    const formattedRoute: string = route.replace(/:(\w+)/, (_match, group) => ":" + group.replace(/[a-zA-Z]/g, args));
    const request = await axios.post(this._urlBase + formattedRoute, data);

    try{
      return JSON.parse(request.data);
    }catch (e){
      throw new ApiError('Request error code ' + request.status);
    }

  }
}