import { Client, Collection, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import command_handler from "./handlers/command_handler";
import event_handler from "./handlers/event_handler";
import components_handler from "./handlers/components_handler";
dotenv.config();

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


command_handler(client, DISCORD_TOKEN, DISCORD_ID);
event_handler(client);
components_handler(client)


export default client;

client.login(DISCORD_TOKEN);
