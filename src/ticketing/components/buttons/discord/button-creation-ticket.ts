import {
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
} from "discord.js";
import createTicketModal from "../../modals/modal-creation-ticket";

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
      console.error(error);
    }
  },
};
