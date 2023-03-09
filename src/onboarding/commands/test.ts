import {
  ActionRowBuilder,
  ButtonBuilder,
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import test from '../components/buttons/test';

export default {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Replies with Pong!'),
  async execute(interaction: CommandInteraction) {
    const but = new ActionRowBuilder<ButtonBuilder>().addComponents(test.data);
    await interaction.reply({ components: [but] });
  },
};
