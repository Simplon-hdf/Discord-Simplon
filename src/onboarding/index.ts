import { Client, Events, GatewayIntentBits, Interaction } from "discord.js";
import EventEmitter from "events";
import * as dotenv from "dotenv";
import { ClientManager } from "./utils/client_manager";

dotenv.config();
process.setMaxListeners(0);
EventEmitter.setMaxListeners(0);

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_ID = process.env.DISCORD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites] });
ClientManager.init(client, DISCORD_TOKEN, DISCORD_ID);

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (interaction.isChatInputCommand()) { ClientManager.get_command(interaction['commandName'])?.execute(interaction); } 
  else { ClientManager.get_component((interaction as any)['customId'])?.execute(interaction); }
});

client.login(DISCORD_TOKEN);
