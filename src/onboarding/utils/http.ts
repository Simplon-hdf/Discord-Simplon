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
      // La requête a été effectuée et le serveur a renvoyé une réponse avec un code d'erreur
      logger.error('Code de statut: ' + error.response.status);
      logger.error(
        'Données de réponse: ' + JSON.stringify(error.response.data),
      );
      logger.error('En-têtes de réponse: \n\n' + error.response.headers);
    } else if (error.request) {
      // La requête a été effectuée mais aucune réponse n'a été reçue
      logger.error('Aucune réponse reçue: ' + error.request);
    } else {
      // Une erreur s'est produite lors de la configuration de la requête
      logger.error('Erreur de configuration de la requête: ' + error.message);
    }
  }
}
