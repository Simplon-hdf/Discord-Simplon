import { ButtonInteraction, Client, Collection, Events, GatewayIntentBits, Interaction } from "discord.js";
import EventEmitter from "events";
import * as dotenv from "dotenv";
import command_handler from "./handlers/command_handler";
import event_handler from "./handlers/event_handler";
import components_handler from "./handlers/components_handler";
import {HttpUtils} from "./utils/http";
import { ProcedureManager } from "./utils/procedures/ProcedureManager";

dotenv.config();
process.setMaxListeners(0);
EventEmitter.setMaxListeners(0);

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_ID = process.env.DISCORD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites] });
command_handler(client, DISCORD_TOKEN, DISCORD_ID);
event_handler(client);
components_handler(client);
(client as any).procedureManager = new ProcedureManager();

client.on(Events.InteractionCreate, async (interaction : Interaction) => {
    const parsedClient : any = client;
    if(interaction.isChatInputCommand()) {
      parsedClient.commands.get(interaction['commandName']).execute(interaction);
    } else {
      const castedInteraction : any = interaction;
      parsedClient.components.get(castedInteraction['customId']).execute(interaction);
    }
});


client.login(DISCORD_TOKEN);
