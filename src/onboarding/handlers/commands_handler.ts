import { REST, Routes, Collection } from "discord.js";
import fs from "node:fs";

import * as dotenv from "dotenv";

export default async (client, discord_token, discord_client_id) => {
    client.handleCommands = async () => {
        dotenv.config();

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        client.commands = new Collection();

        for (const file of commandFiles) {
            console.log(file);
            const cmd = await import(`../commands/${file}`);

            if ('data' in cmd && 'execute' in cmd) {
                client.commands.set(cmd.data.name, cmd);
            } else {
                console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
            }
        }

        

        const rest = new REST({ version: '10' }).setToken(discord_token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(Routes.applicationCommands(discord_client_id), { body: client.commands });

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();

    }
}