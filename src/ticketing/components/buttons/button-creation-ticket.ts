import {
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
} from "discord.js";
import createTicketModal from "../modals/modal-creation-ticket";

export default {
  data: new ButtonBuilder()
    .setCustomId("create-ticket")
    .setLabel("Crée un ticket")
    .setEmoji("🎫")
    .setStyle(ButtonStyle.Primary),

  run: async (interaction: ButtonInteraction) => {
    try {

    await interaction.showModal(createTicketModal.data);
      
    } catch (error) {
      interaction.reply(
        `[ERROR] [BUTTON] => Button with customId: ${interaction.customId} occured and error`
      );
    }
  },
};
