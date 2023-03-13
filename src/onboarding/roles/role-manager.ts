import { IRole } from './role';
import { HttpUtils } from '../utils/http';
import { HttpRoutes } from '../utils/routes/http-routes';
import logger from '../utils/logger';

export class RoleManager {
  async registerRole(role: IRole): Promise<any> {
    const roleJSON = await new HttpUtils().post(
      HttpRoutes.REGISTER_ROLE,
      JSON.parse(JSON.stringify(role)),
    );

    logger.info('RoleManager => Register new role');

    return roleJSON;
  }
}
