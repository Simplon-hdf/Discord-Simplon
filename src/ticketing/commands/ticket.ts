import { ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("test")
    .setDMPermission(false),

  run: async (interaction: ChatInputCommandInteraction) => {
    // const button = new ActionRowBuilder<ButtonBuilder>().addComponents(createTicket.data)
    // await interaction.reply({ content: "coucou", components: [button] })
  },
};