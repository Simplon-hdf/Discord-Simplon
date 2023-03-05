import { ButtonBuilder, ButtonStyle, ButtonInteraction } from "discord.js";

export default {
  data: new ButtonBuilder()
    .setCustomId("create-ticket")
    .setLabel("Crée un ticket")
    .setEmoji("🎫")
    .setStyle(ButtonStyle.Primary),
  
  run: async (interaction: ButtonInteraction) => {
    try {

    interaction.reply({ content: "SA FONCTIONNE ENFIN PTN BG" });
        
    } catch (error) {
        console.error(error)
    }
  }
};