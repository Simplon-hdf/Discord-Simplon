import { ButtonBuilder, ButtonStyle, ButtonInteraction } from "discord.js";

export default {
  data: new ButtonBuilder()
    .setCustomId("close-ticket")
    .setLabel("Fermer le ticket")
    .setEmoji("🚪")
    .setStyle(ButtonStyle.Danger),

  run: async (interaction: ButtonInteraction) => {
    try {
      console.log(interaction);
      await interaction.reply("fermer");
    } catch (error) {
      await interaction.reply(
        `[ERROR] [BUTTON] => Button with customId: ${interaction.customId} occured and error`
      );
    }
  },
};
