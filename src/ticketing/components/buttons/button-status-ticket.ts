import { ButtonBuilder, ButtonStyle, ButtonInteraction } from "discord.js";

export default {
  data: new ButtonBuilder()
    .setCustomId("update-ticket")
    .setLabel("Problème résolu")
    .setEmoji("✅")
    .setStyle(ButtonStyle.Success),

  run: async (interaction: ButtonInteraction) => {
    try {
      console.log(interaction)
      await interaction.reply("pb résolu");
    } catch (error) {
      interaction.reply(
        `[ERROR] [BUTTON] => Button with customId: ${interaction.customId} occured and error`
      );
    }
  },
};
