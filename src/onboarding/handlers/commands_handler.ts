/// <reference path="../commands/ping_cmd.ts"/>

import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../type.js";
import * as dotenv from "dotenv";


export default async (client : Client, discord_token, discord_client_id) => {
    dotenv.config();

    const slashCommands : SlashCommandBuilder[] = [];

    let slashCommandsDir = join("./onboarding/dist/commands/");

    readdirSync(slashCommandsDir).forEach(async file => {
        console.log(file)
        if (!file.endsWith(".js")) return;
        let command = await import(`../commands/${file}`);
        slashCommands.push(command.default.command);
        client.slashCommands.set(command.command.name, command);
    })




    const rest = new REST({ version: '10' }).setToken(discord_token);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands(discord_client_id), { body: slashCommands.map(command => command.toJSON())});

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}