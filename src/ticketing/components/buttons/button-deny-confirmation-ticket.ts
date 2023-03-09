import { ButtonBuilder, ButtonStyle, ButtonInteraction } from "discord.js";

export default {
  data: new ButtonBuilder()
    .setCustomId("confirmation-deny-ticket-close")
    .setLabel("Ne pas fermer le ticket")
    .setEmoji("🙅")
    .setStyle(ButtonStyle.Danger),

  run: async (interaction: ButtonInteraction) => {
    try {
      console.log(interaction)
      await interaction.reply("ticket fermer");
    } catch (error) {
      await interaction.reply(
        `[ERROR] [BUTTON] => Button with customId: ${interaction.customId} occured and error`
      );
    }
  },
};
