import { SlashCommandBuilder } from "discord.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js'


export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    execute: async (interaction) => {
        console.log('test')
        await interaction.reply('Pong!');
    },
}