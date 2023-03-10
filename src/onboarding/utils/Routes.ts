export enum Routes {
  GET_GUILD_CONFIG = '/api/guilds/config',
  GET_GUILD = '/api/guilds/:id',
  CREATE_GUILD = '/api/guilds/register',
  GET_COURSES_BY_GUILD_UUID = '/api/courses/guilds/:uuid',
  GET_ONGOING_PROMOS_BY_GUILD_UUID = '/api/promo/guild/:uuid/state/true',
  GET_ROLES_BY_GUILD_UUID = '/api/roles/guilds/:uuid',
  GET_PROMOS_BY_GUILD_UUID = '/api/promo/guild/:uuid'
}