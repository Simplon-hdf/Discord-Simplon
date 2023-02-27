import {Client, Events, GuildManager} from "discord.js";


export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log('Ready! Logged in as ' + client.user?.tag);

    const guild : GuildManager = client.guilds



  }
}