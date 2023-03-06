import {
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
} from "discord.js";
import createTicketModal from "../modals/create-ticket";
import { HttpUtils } from "../../utils/http";
import { Routes } from "../../utils/routes";

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
