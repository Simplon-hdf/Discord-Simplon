import { ButtonBuilder, ButtonInteraction, ButtonStyle, ComponentBuilder, ModalBuilder } from 'discord.js';
import EmbedMessage from '../../../embeds/embed-message';
import askNameModal from '../../modal/courses/ask-name';
import logger from '../../../utils/logger';
import CustomComponent from '../../CustomComponent';

export default class CourseCreationButton extends CustomComponent {
  
  protected data: any;
  protected customId: string = 'courses-creation';
  protected component: ComponentBuilder = new ButtonBuilder()
    .setCustomId('courses-creation')
    .setLabel('Creer une formation')
    .setStyle(ButtonStyle.Primary)

  async execute(interaction: ButtonInteraction) {
    const embed = new EmbedMessage(
      'Sélectionner un type de formation',
      '#ce0033',
      'Permet de sélectionner le type de formation',
    );

    try {
      await interaction.showModal(new askNameModal().get_component().data as ModalBuilder);
    } catch (e: any) {
      logger.error(e);
      throw new Error(e.message);
    }
  }
};
