import { Client, Events, GatewayIntentBits, Interaction } from "discord.js";
import EventEmitter from "events";
import * as dotenv from "dotenv";
import command_handler from "./handlers/command_handler";
import event_handler from "./handlers/event_handler";
import components_handler from "./handlers/components_handler";
import {HttpUtils} from "./utils/http";

dotenv.config();
process.setMaxListeners(0);
EventEmitter.setMaxListeners(0);

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_ID = process.env.DISCORD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites] });
command_handler(client, DISCORD_TOKEN, DISCORD_ID);
event_handler(client);
components_handler(client);

client.on(Events.InteractionCreate, async (interaction : Interaction) => {
    if(interaction.isChatInputCommand()) {
      const parsedClient : any = client;
      const command = parsedClient.commands.get(interaction['commandName']);
      command.execute(interaction);
    } else if (interaction.isButton()) {
      const parsedClient : any = client;
      for(const d of parsedClient.components)
        console.log(d);
    }
});


client.login(DISCORD_TOKEN);
