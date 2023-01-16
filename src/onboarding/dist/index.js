import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();
var DISCORD_TOKEN = process.env.DISCORD_TOKEN;
console.log(DISCORD_TOKEN);
var client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(DISCORD_TOKEN);
