import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("test")
    .setDMPermission(false),

  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply("pong !")
  },
};