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

  async getRoles(guild_uuid: string): Promise<any> {
    const rolesJSON = await new HttpUtils().get(
      HttpRoutes.GET_ROLES_BY_GUILD_UUID,
      guild_uuid,
    );

    logger.info('RoleManager => Load roles');

    return rolesJSON;
  }

  async deleteRole(role_uuid: string): Promise<any> {
    const roleJSON = await new HttpUtils().delete(
      HttpRoutes.DELETE_ROLE,
      undefined,
      role_uuid,
    );

    logger.info('RoleManager => Delete role');

    return roleJSON;
  }

  async updateRole(role: IRole): Promise<any> {
    const roleJSON = await new HttpUtils().patch(
      HttpRoutes.UPDATE_ROLE,
      JSON.parse(JSON.stringify(role)),
    );

    logger.info('RoleManager => Update role');

    return roleJSON;
  }
}
