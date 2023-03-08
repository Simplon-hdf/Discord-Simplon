import { StringSelectMenuBuilder, ChannelType } from "discord.js";
import EmbedMessage from "../../classes/embed-message";
import { DiscordClient } from "../../classes/utils/client";
import { Guild } from "../../guild";
import { HttpUtils } from "../../utils/http";
import { Routes } from "../../utils/routes";

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

      const thread = await interaction.channel.threads.create({
        name: `[${ticket?.ticketState}] - ${interaction.user.username} | ${ticket?.ticketTag}`,
        type: ChannelType.PrivateThread,
        reason: ticket?.ticketTag,
      });

      await thread.members.add(interaction.user.id);

      const ticketCreatedEmbed = new EmbedMessage("Création de votre ticket", "#ce0033", `\n\nVotre ticket a bien était crée.\n\n Ticket: <#${thread.id}>\n Raison: ${ticket?.ticketTag} \n\n Veillez à bien détailler votre demande dans celui-ci.`)

            // await new HttpUtils().post(Routes.REGISTER_NEW_TICKET,
      // {
      //   user_uuid: interaction.user.id,
      //   role_uuid: poleSelected,
      //   ticket_tag: ticket?.ticketTag,
      //   ticket_state: "IDLE",
      // });

      await interaction.reply({
        embeds: [ticketCreatedEmbed],
        ephemeral: true,
      });
    } catch (error) {
      interaction.reply(
        `[ERROR] [SELECT_MENU] => Select menu with customId: ${interaction.customId} occured and error`
      );
      console.error(error);
    }
  },
};
