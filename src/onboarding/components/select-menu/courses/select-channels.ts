import {
  APIBaseComponent,
  ComponentBuilder,
  ComponentType,
  ModalBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from 'discord.js';
import { DiscordClient } from '../../../client';
import { SlashCommand } from '../../../commands/SlashCommand';
import logger from '../../../utils/logger';
import CustomComponent from '../../CustomComponent';

export default class SelectConcernedPole extends CustomComponent {
  protected customId = '';
  protected data: any;
  protected component: ComponentBuilder = new StringSelectMenuBuilder()
    .setCustomId('selectConcernedPole')
    .setPlaceholder('Veuillez sélectionner une réponse');

  async execute(interaction: StringSelectMenuInteraction) {
    const client = DiscordClient.getInstance(interaction.user.id);

    const course = client.getCoursesManager().getCourse();
    logger.info(course?.name);
    await interaction.reply({
      content: interaction.values.toString(),
      ephemeral: true,
    });
  }
}
