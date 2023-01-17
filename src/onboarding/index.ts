import { Client, Events, GatewayIntentBits, Interaction, Collection, SlashCommandBuilder } from "discord.js";
import * as dotenv from "dotenv";
import commands_handler from "./handlers/commands_handler.js";

dotenv.config();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_ID = process.env.DISCORD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages] });

commands_handler(client, DISCORD_TOKEN, DISCORD_ID);




client.on('ready', () => {
    if (client.user != undefined) {
        console.log(`Logged in as ${client.user.tag}!`);
    }
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;
	
    let command = interaction.client.slashCommands.get(interaction.commandName)


	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})



client.login(DISCORD_TOKEN);
