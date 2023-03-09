import {
  ActionRowBuilder,
  ButtonBuilder,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import createTicket from "../components/buttons/button-creation-ticket";
import EmbedMessage from "../classes/embed-message";

export default {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Commande relative au sous-commande du bot de ticketing.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("interface")
        .setDescription("Envoie l'interface de création de tickets.")
    ),
  run: async (interaction: ChatInputCommandInteraction) => {
    if (interaction.options.getSubcommand() === "interface") {
      const CreateTicketButton = new ActionRowBuilder<ButtonBuilder>().addComponents(createTicket.data);
      const CreateTicketEmbed = new EmbedMessage(
        "Création d'un ticket",
        "#ce0033",
        "Bonjour, pour commencer la création d'un ticket veuillez cliquer sur le bouton ci-dessous.",
        "https://simplon.co/favicon.png"
      );

      await interaction.reply({
        embeds: [CreateTicketEmbed],
        components: [CreateTicketButton],
      });
    }
  },
};
