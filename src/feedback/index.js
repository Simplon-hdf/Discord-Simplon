import {
  Client,
  Events,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  SelectMenuBuilder,
} from 'discord.js';
import commands_handler from './handlers/deploy-comands.js';
import * as dotenv from 'dotenv';
import database from './database/db.json' assert { type: 'json' };

dotenv.config();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
  ],
});

commands_handler(client, DISCORD_TOKEN, CLIENT_ID);

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'setup-feedback') {
      const configEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Commencer la procédure de configuration de feedback')
        .setDescription(
          `Bonjour ${interaction.member.displayName}, \n\n pour commencer la procédure de configuration de feedback, veuillez cliquer sur un des boutons ci-dessous.`
        )
        .setThumbnail(
          'https://cdn-icons-png.flaticon.com/512/1087/1087804.png'
        );
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('sendExistingFeedback')
          .setLabel('Envoyer un modèle de feedback existant')
          .setEmoji('📩')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId('createFeedback')
          .setLabel('Créer un nouveau modèle de feedback')
          .setEmoji('📝')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('configureFeedback')
          .setLabel('Configurer un modèle de feedback existant')
          .setEmoji('⚙️')
          .setStyle(ButtonStyle.Secondary)
      );
      await interaction.reply({
        embeds: [configEmbed],
        components: [row],
      });
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === 'sendExistingFeedback') {
      const templateSelectionEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Sélection du feedBack')
        .setDescription(
          'Veuiller sélectionner le feedback souhaité dans la liste ci-dessous'
        )
        .setThumbnail(
          'https://cdn-icons-png.flaticon.com/512/1087/1087804.png'
        );

      const templateSelectionRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select_template')
          .setPlaceholder("Aucune réponse n'est sélectionnée")
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions(
            Object.values(database.modals).map((item, index) => {
              return {
                label: `[${item.title}]`,
                description: `${item.description}`,
                value: `${index}`,
              };
            })
          )
      );

      await interaction.reply({
        embeds: [templateSelectionEmbed],
        components: [templateSelectionRow],
        ephemeral: true,
      });
    }
  } else if (interaction.isAnySelectMenu()) {
    if (interaction.customId === 'select_template') {
      // const feedbackSelectionModal = new ModalBuilder()
      //   .setCustomId(database.modals[interaction.values[0]].customId)
      //   .setTitle(database.modals[interaction.values[0]].title);

      // const input_list = database.modals[interaction.values[0]].inputs;

      // input_list.map((input) => {
      //   let actualInputStyle = input.style;
      //   let inputStyle = actualInputStyle === "Short" ? TextInputStyle.Short : TextInputStyle.Paragraph
      //   feedbackSelectionModal.addComponents(
      //     new ActionRowBuilder().addComponents(
      //       new TextInputBuilder()
      //         .setCustomId(input.customId)
      //         .setLabel(input.label)
      //         .setStyle(inputStyle)
      //     )
      //   );
      // });
      // await interaction.showModal(feedbackSelectionModal);

      const promotions = database.apprenants;
      const selectPromotionEmbed = new EmbedBuilder()
        .setTitle('Sélectionner la catégorie de promotion')
        .setColor(0x0099ff)
        .setDescription(
          `Veuillez sélectionner la catégorie de promotion concernée par le feedback **${interaction.values[0]}**.`
        );

      const selectPromotionRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select-promotion')
          .setPlaceholder(
            "Aucune catégorie de promotion n'est actuellement selectionnée")
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions(
              Object.keys(promotions.map((u) => u)[0]).map((promotion, index) => {
                return {
                  label: `${promotion}`,
                  description: `Promotion ${promotion}`,
                  value: `${index}`,
                };
              })
          )
      );
      await interaction.reply({
        embeds: [selectPromotionEmbed],
        components: [selectPromotionRow],
        ephemeral: true,
      });
    }
  }
});

client.login(DISCORD_TOKEN);
