import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('active')
    .setDescription('Run this command to activate the bot'),
  async execute(interaction) {
    await interaction.reply('Hello');
  },
};
