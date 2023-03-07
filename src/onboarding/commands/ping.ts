import {CommandInteraction, SlashCommandBuilder} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Reply with Pong!'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply('Pong!')
    }
}