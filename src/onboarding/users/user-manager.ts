import { IUser } from './user';
import logger from '../utils/logger';
import { HttpUtils } from '../utils/http';
import { HttpRoutes } from '../utils/routes/http-routes';

export class UserManager {
  async registerUser(user: IUser) {
    const userJSON = await new HttpUtils().post(
      HttpRoutes.CREATE_USER,
      JSON.parse(JSON.stringify(user)),
    );

    logger.info('UserManager => Register new user');

    if (userJSON.statusCode === 409) {
      return;
    }

    return userJSON;
  }

  async getUsersByGuild(guild_uuid: string): Promise<any> {
    const userJSON = await new HttpUtils().get(
      HttpRoutes.GET_USER_BY_GUILD,
      guild_uuid,
    );
    if (userJSON.statusCode === 409) {
      return;
    }
    logger.info('UserManager => Load user : ' + guild_uuid + '\n');

    return userJSON;
  }

  async getUserByUuid(user_uuid: string): Promise<any> {
    const userJSON = await new HttpUtils().get(HttpRoutes.GET_USER, user_uuid);
    if (userJSON.statusCode === 409) {
      return;
    }
    logger.info('UserManager => Load user : ' + user_uuid + '\n');

    return userJSON;
  }

  async deleteUserByUuid(user_uuid: string, guild_uuid: string): Promise<any> {
    const userJSON = await new HttpUtils().delete(HttpRoutes.DELETE_USER, {
      user_uuid: user_uuid,
      guild_uuid: guild_uuid,
    });
    if (userJSON.statusCode === 409) {
      return;
    }
    logger.info('UserManager => Delete user : ' + user_uuid + '\n');

    return userJSON;
  }
}
