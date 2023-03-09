import { ButtonBuilder, ButtonStyle, ButtonInteraction } from "discord.js";

export default {
  data: new ButtonBuilder()
    .setCustomId("transcript-ticket")
    .setEmoji("📩")
    .setLabel("Transcript le ticket par mail")
    .setStyle(ButtonStyle.Secondary),

  run: async (interaction: ButtonInteraction) => {
    try {
      console.log(interaction);
      await interaction.reply("transcript");
    } catch (error) {
      interaction.reply(
        `[ERROR] [BUTTON] => Button with customId: ${interaction.customId} occured and error`
      );
    }
  },
};
