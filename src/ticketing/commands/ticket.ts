import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, SlashCommandBuilder } from "discord.js";
import createTicket from "../buttons/ticket/create-ticket";

export default {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("test"),

  run: async (interaction: ButtonInteraction) => {
    const button = new ActionRowBuilder<ButtonBuilder>().addComponents(createTicket.data)
    await interaction.reply({ content: "coucou", components: [button] })
  },
};