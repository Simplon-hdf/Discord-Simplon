export enum Routes {
  GET_GUILD_CONFIG = '/api/guilds/config',
  GET_GUILD = '/api/guilds/:uuid',
  CREATE_GUILD = '/api/guilds/register',
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
}
