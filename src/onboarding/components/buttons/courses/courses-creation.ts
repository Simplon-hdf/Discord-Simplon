import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
} from "discord.js";
import EmbedMessage from "../../../embeds/embed-message";
import askName from "../../modal/courses/ask-name";
import logger from "../../../utils/logger";

export default {
  data: new ButtonBuilder()
    .setCustomId('courses-creation')
    .setLabel('Creer une formation')
    .setStyle(ButtonStyle.Primary),
  async execute(interaction : ButtonInteraction) {

    const embed = new EmbedMessage(
      'Sélectionner un type de formation',
      '#ce0033',
      'Permet de sélectionner le type de formation',
    );

    try{
      await interaction.showModal(askName.data);
    }catch (e: any){
      logger.error(e);
      throw new Error(e.message);
    }
  },
}