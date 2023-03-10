import { REST, Routes, Collection, Client } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ClientManager } from '../utils/client-manager';

export default async (discord_token: any, discord_client_id: any) => {
  dotenv.config();

  const commandFiles = getAllFiles('./build/commands/');

  function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    try {
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
          arrayOfFiles.push(path.join(dirPath, '/', file));
        }
      });
    } catch (error) {
      console.log(error);
    }
    return arrayOfFiles;
  }

  for (const file of commandFiles) {
    if (file.includes('SlashCommand')) continue;
    try {
      ClientManager.add_command(new (await import(`../../${file}`)).default()); // Link cmd name to complete module
    } catch (error) {
      console.log(
        `${file} command can't be load (must because it's not a constructor)`,
      );
    }
  }

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');

      const serialized_commands = Array.from(
        ClientManager.get_commands().values(),
      ).map((slash_command) => slash_command.get_data().toJSON());
      await new REST({ version: '10' })
        .setToken(discord_token)
        .put(Routes.applicationCommands(discord_client_id), {
          body: serialized_commands,
        }); //Logging commands on RESTAPI (for each values in commands, get data.JSON() to register it

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();
};
