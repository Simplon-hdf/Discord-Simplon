/// <reference path="../commands/ping_cmd.ts"/>
/// <reference path="../commands/create_course_interface.ts" />
/// <reference path="../commands/add-learner-to-class.ts"/>
/// <reference path="../commands/create_course_info_interface.ts" />
/// <reference path="../commands/create_promo_interface.ts" />
/// <reference path="../commands/channel_selector/config_interface.ts" />

import { REST, Routes, Collection } from "discord.js";
import * as fs from "fs";
import * as path from 'path';
import * as dotenv from "dotenv";

export default async (client, discord_token, discord_client_id) => {
    dotenv.config();
    
    const commandFiles = getAllFiles('./onboarding/dist/commands/')

    function getAllFiles(dirPath, arrayOfFiles?){
        const files = fs.readdirSync(dirPath)

        arrayOfFiles = arrayOfFiles || []
      
        files.forEach(function(file) {
          if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(path.join(dirPath.replace('onboarding/dist', ''), "/", file))
          }
        })
      
        return arrayOfFiles
    }
    
    client.commands = new Collection();

    for (const file of commandFiles) {
        // console.log(file);
        const cmd = await import(`../${file}`);
        //console.log(cmd.default);
        client.commands.set(cmd.default.data.name, cmd.default); // Link cmd name to complete module
    }

    const rest = new REST({ version: '10' }).setToken(discord_token);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands(discord_client_id), { body: client.commands.map(x => x.data.toJSON())}); //Logging commands on RESTAPI (for each values in commands, get data.JSON() to register it

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}