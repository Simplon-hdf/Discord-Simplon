import {
  Client,
  Collection,
  GatewayIntentBits,
} from "discord.js";
import * as dotenv from "dotenv";
import button_handler from "./handlers/button_handler";
import command_handler from "./handlers/command_handler";
import event_handler from "./handlers/event_handler";
import modal_handler from "./handlers/modal_handler";
dotenv.config();


declare module "discord.js" {
  export interface Client {
    buttons: Collection<string, any>;
    modals: Collection<string, any>;
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
  ],
});


const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_ID = process.env.DISCORD_ID;

client.buttons = new Collection();
client.modals = new Collection()

command_handler(client, DISCORD_TOKEN, DISCORD_ID);
event_handler(client);
button_handler(client)
modal_handler(client)

export default client;

client.login(DISCORD_TOKEN);
