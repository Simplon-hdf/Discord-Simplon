import { Client, CommandInteraction, Events, GatewayIntentBits, Interaction } from "discord.js";
import * as dotenv from "dotenv";
import commands_handler from "./handlers/commands_handler.js";
import events_handler from "./handlers/events_handler.js"; 

dotenv.config();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_ID = process.env.DISCORD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers] });

commands_handler(client, DISCORD_TOKEN, DISCORD_ID);
events_handler(client);

client.on(Events.InteractionCreate, async (interaction : Interaction) => {
    if(!interaction.isChatInputCommand()) return; 
    const parsedClient : any = client;
    const command = parsedClient.commands.get(interaction['commandName']);
    command.execute(interaction);
});

client.login(DISCORD_TOKEN);
