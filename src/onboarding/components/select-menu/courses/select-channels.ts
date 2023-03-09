import {
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from 'discord.js';
import { DiscordClient } from '../../../client';
import logger from '../../../utils/logger';

export default {
  data: new StringSelectMenuBuilder()
    .setCustomId('selectConcernedPole')
    .setPlaceholder('Veuillez sélectionner une réponse'),
  execute: async (interaction: StringSelectMenuInteraction) => {
    const client = DiscordClient.getInstance(interaction.user.id);

    const course = client.getCoursesManager().getCourse();
    logger.info(course?.name);
    await interaction.reply({
      content: interaction.values.toString(),
      ephemeral: true,
    });
  },
};
