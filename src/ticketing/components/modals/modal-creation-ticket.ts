import {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalSubmitInteraction,
  StringSelectMenuBuilder,
} from "discord.js";
import selectMenuPoleSelection from "../select_menu/select_menu-creation-ticket";
import EmbedMessage from "../../classes/embed-message";
import { HttpUtils } from "../../utils/http";
import { Routes } from "../../utils/routes";
import { Ticket } from "../../classes/utils/ticket";
import { DiscordClient } from "../../classes/utils/client";

export default {
  data: new ModalBuilder()
    .setCustomId("createTicketModal")
    .setTitle("Création d'un ticket.")
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("userRequest")
          .setLabel("Demande du ticket")
          .setPlaceholder("ex. Problème rémunération.")
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
      )
    ),
  run: async (interaction: ModalSubmitInteraction) => {
    try {

      const userRequest = interaction.fields.getTextInputValue('userRequest');

      const client = DiscordClient.getInstance();
      const ticket = new Ticket(interaction.user.id, userRequest, "IDLE");
      client.setTicket(ticket)

      const selectMenuPoleSelectionRow =
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          selectMenuPoleSelection.data
        );

      const SelectConcernedPole = new EmbedMessage(
        "Sélection du pôle concerne",
        "#ce0033",
        "À fin de finalisée la création de votre ticket veuillez sélectionner le pole concerner par votre demande si aucune réponse ne convient merci de bien vouloir sélectionner **autre pole**.",
        "https://simplon.co/favicon.png"
      );
      
      await interaction.reply({
        embeds: [SelectConcernedPole],
        components: [selectMenuPoleSelectionRow],
        ephemeral: true,
      });

    } catch (error) {
      interaction.reply(
        `[ERROR] [MODAL] => Modal with customId: ${interaction.customId} occured and error`
      );
    } 
  },
};
