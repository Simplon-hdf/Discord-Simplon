import { ButtonBuilder, ButtonStyle, ButtonInteraction } from "discord.js";

export default {
  data: new ButtonBuilder()
    .setCustomId("confirmatio-accept-ticket-close")
    .setLabel("Fermer le ticket")
    .setEmoji("👀")
    .setStyle(ButtonStyle.Success),

  run: async (interaction: ButtonInteraction) => {
    try {
      console.log(interaction)
      await interaction.reply("ticket fermer");
    } catch (error) {
      console.error(error);
    }
  },
};
