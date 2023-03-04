import { Client, Events } from "discord.js";
import client from "../index";


const clientReady = client.once(Events.ClientReady, (client: Client) => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
  });
export default clientReady;