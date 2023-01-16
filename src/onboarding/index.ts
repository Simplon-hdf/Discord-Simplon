import {Client, Events, GatewayIntentBits} from "discord.js";

import * as dotenv from "dotenv";

dotenv.config();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

console.log(DISCORD_TOKEN);

const client = new Client({ intents : [GatewayIntentBits.Guilds]});

client.login(DISCORD_TOKEN);