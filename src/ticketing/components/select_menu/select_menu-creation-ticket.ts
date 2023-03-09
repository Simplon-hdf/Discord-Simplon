import {
  StringSelectMenuBuilder,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
} from "discord.js";
import EmbedMessage from "../../classes/embed-message";
import { DiscordClient } from "../../classes/utils/client";
import { Guild } from "../../guild";
import { HttpUtils } from "../../utils/http";
import { Routes } from "../../utils/routes";
import buttonCloseTicket from "../buttons/button-close-ticket";
import buttonStatusTicket from "../buttons/button-status-ticket";
import buttonTranscriptTicket from "../buttons/button-transcript-ticket";

const roles = Guild.YamlConfig.get()["ticketRoles"];

const role = roles.map((role: any) => {
  let pole = Object.keys(role)[0];
  let value = role[pole];
  return {
    label: `[${pole}]`,
    description: `Le ticket concernera le pole: ${pole}`,
    value: `${value}`,
  };
});

export default {
  data: new StringSelectMenuBuilder()
    .setCustomId("selectConcernedPole")
    .setPlaceholder("Veuillez sélectionner une réponse")
    .addOptions(role),
  run: async (interaction: any) => {
    try {
      const poleSelected = interaction.values[0];
      const client = DiscordClient.getInstance();
      const ticket = client.getTicket();
      const ticketInsideEmbed = new EmbedMessage(
        "Géstion du ticket",
        "#ce0033",
        `\n\n Bonjour ${interaction.user.username}, \nBienvenue sur votre ticket un membre du staff vas s'occuper de votre ticket. \n\n Informations du ticket: \n\n- **Status**: En attente.\n- **Demande**: ${ticket?.ticketTag}.\n- **Utilisateurs**: ${interaction.user.username}.\n- **Pole concerner**: SOON. \n\n Détailler le plus possible votre demande pour que nous puissions au mieux répondre à votre demande.`
      );
      const thread = await interaction?.channel?.threads.create({
        name: `[${ticket?.ticketState}] - ${interaction.user.username} | ${ticket?.ticketTag}`,
        type: ChannelType.PrivateThread,
        reason: ticket?.ticketTag,
      });
      await thread.members.add(interaction.user.id);
      await new HttpUtils().post(Routes.REGISTER_NEW_TICKET, {
        user_uuid: interaction.user.id,
        role_uuid: poleSelected,
        ticket_tag: ticket?.ticketTag,
        ticket_state: "IDLE",
      });

      const componentsRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        buttonCloseTicket.data,
        buttonStatusTicket.data,
        buttonTranscriptTicket.data
      );

      await thread.send({
        content: `<@&${poleSelected}>`,
        embeds: [ticketInsideEmbed],
        components: [componentsRow],
      });

      await interaction.reply({
        content: "✅ Votre ticket a bien était crée.",
        ephemeral: true,
      });
    } catch (error) {
      await interaction.reply(
        `[ERROR] [SELECT_MENU] => Select-menu with customId: ${interaction.customId} occured and error`
      );
      console.error(error);
    }
  },
};
