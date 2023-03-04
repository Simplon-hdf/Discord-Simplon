import { ButtonBuilder, ButtonStyle, ButtonInteraction } from "discord.js";

export default {
  data: new ButtonBuilder()
    .setCustomId("MusicRemoveButton")
    .setLabel("Ceci est un")
    .setEmoji("🗑️")
    .setStyle(ButtonStyle.Danger),
  
  run: async (interaction: ButtonInteraction) => {
    try {

    interaction.reply({ content: "coucou" });
        
    } catch (error) {
        console.error(error)
    }
  }
};