/// <reference path="../commands/ping_cmd.ts"/>

import { REST, Routes, Collection, SlashCommandBuilder, Client } from "discord.js";
import * as fs from "fs";
import * as dotenv from "dotenv";

export default async (client : Client, discord_token, discord_client_id) => {
    dotenv.config();
    
    const commandFiles = fs.readdirSync('./onboarding/dist/commands/');
    const commands : SlashCommandBuilder[] = [];

    for (const file of commandFiles) {
        // console.log(file);
        const cmd = await import(`../commands/${file}`);
        commands.push(cmd.default.data);
        console.log(commands);

    }



    const rest = new REST({ version: '10' }).setToken(discord_token);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands(discord_client_id), { body: commands});

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}