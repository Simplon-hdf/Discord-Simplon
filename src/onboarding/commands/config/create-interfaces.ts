import {
  ActionRowBuilder,
  ButtonBuilder,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import EmbedMessage from '../../embeds/embed-message';
import coursesCreation from '../../components/buttons/courses/courses-creation';

export default {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription("Permet d'ajouter les interfaces de configuration")
    .addSubcommand((subcommand) => {
      return subcommand
        .setName('formation')
        .setDescription("Permet de creer l'interface de creation de formation");
    }),
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isCommand()) return;

    if (interaction.options.getSubcommand() === 'formation') {
      const component = new ActionRowBuilder<ButtonBuilder>().addComponents(
        coursesCreation.data,
      );

      const embed = new EmbedMessage(
        'Interface de creation de formation',
        '#ce0033',
        'Permet de creer une formation',
        'https://cdn-icons-png.flaticon.com/512/1125/1125648.png',
      );

      await interaction.reply({ embeds: [embed], components: [component] });
    }
  },
};
