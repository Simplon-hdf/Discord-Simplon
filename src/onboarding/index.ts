import { Client, CommandInteraction, Events, GatewayIntentBits, Interaction, Invite, InviteGuild } from "discord.js";
import * as dotenv from "dotenv";
import commands_handler from "./handlers/commands_handler.js";
import events_handler from "./handlers/events_handler.js"; 
import { EventEmitter } from "events";

dotenv.config();
process.setMaxListeners(0);
EventEmitter.setMaxListeners(0);
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_ID = process.env.DISCORD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites] });

commands_handler(client, DISCORD_TOKEN, DISCORD_ID);
events_handler(client);

client.on(Events.InteractionCreate, async (interaction : Interaction) => {
    if(!interaction.isChatInputCommand()) return; 
    const parsedClient : any = client;
    const command = parsedClient.commands.get(interaction['commandName']);
    command.execute(interaction);
});

client.login(DISCORD_TOKEN);
