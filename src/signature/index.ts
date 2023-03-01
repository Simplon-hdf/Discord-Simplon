import { Client, Events, GatewayIntentBits, Interaction } from "discord.js";
import EventEmitter from "events";
import * as dotenv from "dotenv";
import command_handler from "./handlers/command_handler";
import event_handler from "./handlers/event_handler";
import {onInteraction} from "./interaction";


dotenv.config();
process.setMaxListeners(0);
EventEmitter.setMaxListeners(0);

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_ID = process.env.DISCORD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites] });

command_handler(client, DISCORD_TOKEN, DISCORD_ID);
event_handler(client);

client.on(
    "interactionCreate",
    async (interaction: Interaction) => await onInteraction(interaction)
);

client.login(DISCORD_TOKEN);
