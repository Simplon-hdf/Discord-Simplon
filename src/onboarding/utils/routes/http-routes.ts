export enum HttpRoutes {
  GET_GUILD_CONFIG = '/api/guilds/config',
  GET_GUILD = '/api/guilds/:uuid',
  GET_GUILDS = '/api/guilds',
  CREATE_GUILD = '/api/guilds/register',
  DELETE_GUILD = '/api/guilds/delete/:uuid',

  GET_COURSES_BY_GUILD = '/api/courses/guilds/:uuid',
  GET_CHANNELS_STOCK = '/api/channels-stock/channel/:uuid',
  REGISTER_GUILD_CATEGORY = '/api/category/register',
  REGISTER_GUILD_CHANNEL = '/api/channels/register',
  REGISTER_CHANNEL_STOCK = '/api/channels-stock/register/:categoryUUID',
  GET_CHANNELS_STOCK_EXIST = '/api/channels-stock/exist/:guildUUID',
  GET_GUILD_CATEGORY = '/api/category/guilds/:uuid',
  GET_GUILD_CHANNEL = '/api/channels/guilds/:uuid',
  UPDATE_CHANNEL_NAME = '/api/channels/update/name',
  UPDATE_CATEGORY_NAME = '/api/category/update/name',
  DELETE_CHANNEL = '/api/channels/delete/:uuid',
  DELETE_CATEGORY = '/api/category/delete/:uuid',
  CREATE_USER = '/api/users/register',
  GET_USER_BY_GUILD = '/api/users/guilds/:uuid',
  GET_USER = '/api/users/:uuid',
  DELETE_USER = '/api/users/delete/',
  GET_COURSES_BY_GUILD_UUID = '/api/courses/guilds/:uuid',
  GET_ONGOING_PROMOS_BY_GUILD_UUID = '/api/promo/guild/:uuid/state/true',
  GET_ROLES_BY_GUILD_UUID = '/api/roles/guilds/:uuid',
  GET_PROMOS_BY_GUILD_UUID = '/api/promo/guild/:uuid',
}
