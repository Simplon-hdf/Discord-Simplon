export enum Routes {
  GET_GUILD_CONFIG = '/api/guilds/config',
  GET_GUILD = '/api/guilds/:uuid',
  CREATE_GUILD = '/api/guilds/register',
  GET_COURSES_BY_GUILD = '/api/courses/guilds/:uuid',
  GET_CHANNELS_STOCK = '/api/channels-stock/channel/:uuid',
  REGISTER_GUILD_CATEGORY = '/api/category/register',
  REGISTER_GUILD_CHANNEL = '/api/channels/register',
}