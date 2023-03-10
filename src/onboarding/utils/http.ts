import axios, { AxiosInstance } from 'axios';
import { Guild } from '../guilds/guild';
import { HttpRoutes } from './routes/http-routes';
import { ApiError } from './exceptions/api-error';
import logger from './logger';

export class HttpUtils {
  private readonly _urlBase: string;

  constructor() {
    this._urlBase = Guild.YamlConfig.get()['api-route-url'];
  }

  async get(route: HttpRoutes, args?: string): Promise<any> {
    return new Promise(async (resolve) => {
      const formattedRoute: string =
        args === undefined ? route : route.replace(/:(\w+)/, args);

      const request = await axios
        .get(this._urlBase + formattedRoute)
        .catch((error) => this.formatLog(error));

      resolve(request?.data);
    });
  }

  async post(route: HttpRoutes, data: any, args?: string): Promise<any> {
    return new Promise(async (resolve) => {
      const formattedRoute: string =
        args === undefined ? route : route.replace(/:(\w+)/, args);
      const request =
        data === undefined
          ? await axios
              .post(this._urlBase + formattedRoute)
              .catch((error) => this.formatLog(error))
          : await axios
              .post(this._urlBase + formattedRoute, data)
              .catch((error) => this.formatLog(error));

      resolve(request?.data);
    });
  }

  async patch(route: HttpRoutes, data: any, args?: string): Promise<any> {
    return new Promise(async (resolve) => {
      const formattedRoute: string =
        args === undefined ? route : route.replace(/:(\w+)/, args);
      const request =
        data === undefined
          ? await axios
              .patch(this._urlBase + formattedRoute)
              .catch((error) => this.formatLog(error))
          : await axios
              .patch(this._urlBase + formattedRoute, data)
              .catch((error) => this.formatLog(error));

      resolve(request?.data);
    });
  }

  async delete(route: HttpRoutes, data: any, args?: string): Promise<any> {
    return new Promise(async (resolve) => {
      const formattedRoute: string =
        args === undefined ? route : route.replace(/:(\w+)/, args);
      const request =
        data === undefined
          ? await axios
              .delete(this._urlBase + formattedRoute)
              .catch((error) => this.formatLog(error))
          : await axios
              .delete(this._urlBase + formattedRoute, data)
              .catch((error) => this.formatLog(error));

      resolve(request?.data);
    });
  }

  formatLog(error: any) {
    if (error.response) {
      // La requ??te a ??t?? effectu??e et le serveur a renvoy?? une r??ponse avec un code d'erreur
      logger.error('Code de statut: ' + error.response.status);
      logger.error(
        'Donn??es de r??ponse: ' + JSON.stringify(error.response.data),
      );
      logger.error('En-t??tes de r??ponse: \n\n' + error.response.headers);
    } else if (error.request) {
      // La requ??te a ??t?? effectu??e mais aucune r??ponse n'a ??t?? re??ue
      logger.error('Aucune r??ponse re??ue: ' + error.request);
    } else {
      // Une erreur s'est produite lors de la configuration de la requ??te
      logger.error('Erreur de configuration de la requ??te: ' + error.message);
    }
  }
}
