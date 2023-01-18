import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('setup-feedback')
    .setDescription("Activate the feedback's configuration")
};
