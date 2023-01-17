import { REST, Routes, Collection } from 'discord.js';
import fs from 'node:fs';
import * as dotenv from 'dotenv';

export default async (client, DISCORD_TOKEN, CLIENT_ID) => {
  dotenv.config();

  const commandFiles = fs.readdirSync('./signature/commands');

  client.commands = new Collection();

  for (const file of commandFiles) {
    const command = await import(`../commands/${file}`);
    client.commands.set(command.default.data.name, command.default);
  }

  const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(Routes.applicationCommands(CLIENT_ID), 
        { body: client.commands.map(x => x.data.toJSON())});

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();
};
