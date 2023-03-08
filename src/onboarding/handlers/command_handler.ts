/// <reference path="../commands/config/create-interfaces.ts" />

import { REST, Routes, Collection, Client } from "discord.js";
import * as fs from "fs";
import * as path from 'path';
import * as dotenv from "dotenv";
import logger from "../utils/logger";

export default async (client: any, discord_token?: any, discord_client_id?: any) => {
    dotenv.config();

    const commandFiles = getAllFiles('build/commands/');

    console.log(commandFiles);

    function getAllFiles(dirPath: any, arrayOfFiles?: any) {
        try {
            const files = fs.readdirSync(dirPath)

            arrayOfFiles = arrayOfFiles || []

            files.forEach(function (file) {
                if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                    arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
                } else {
                    arrayOfFiles.push(path.join(dirPath.replace("build/", ''), "/", file));
                }
            })

        } catch (error) {
            logger.error(error);

        }
        return arrayOfFiles
    }



    client.commands = new Collection();

    for (const file of commandFiles) {
        const cmd = await import(`../${file}`);
        logger.info(`Loading command ${cmd.default.data.name}`);

        client.commands.set(cmd.default.data.name, cmd.default); // Link cmd name to complete module
    }

    if (!discord_token && !discord_client_id) {
        throw new Error('Discord id or token is undefined');

    }

    const rest = new REST({ version: '10' }).setToken(discord_token);

    (async () => {
        try {
            logger.info('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands(discord_client_id), { body: client.commands.map((x: any) => x.data.toJSON()) }); //Logging commands on RESTAPI (for each values in commands, get data.JSON() to register it

            logger.info('Successfully reloaded application (/) commands.');
         } catch (error) {
            logger.error(error);
        }
    })();
}
