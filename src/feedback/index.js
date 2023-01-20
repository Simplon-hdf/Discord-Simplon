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
  messageLink,
} from "discord.js";
import commands_handler from "./handlers/deploy-comands.js";
import * as dotenv from "dotenv";
import database from "./database/db.json" assert { type: "json" };

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
    if (interaction.commandName === "setup-feedback") {
      const configEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Configuration feedback | 1/4")
        .setDescription(
          `Bonjour ${interaction.member.displayName}, \n\n pour commencer la procédure de configuration de feedback, veuillez cliquer sur un des boutons ci-dessous.`
        )
        .setThumbnail(
          "https://cdn-icons-png.flaticon.com/512/1087/1087804.png"
        );
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("sendExistingFeedback")
          .setLabel("Envoyer un modèle de feedback existant")
          .setEmoji("📩")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("createFeedback")
          .setLabel("Créer un nouveau modèle de feedback")
          .setEmoji("📝")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("configureFeedback")
          .setLabel("Configurer un modèle de feedback existant")
          .setEmoji("⚙️")
          .setStyle(ButtonStyle.Secondary)
      );
      await interaction.reply({
        embeds: [configEmbed],
        components: [row],
      });
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === "sendExistingFeedback") {
      const templateSelectionEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Sélection du feedBack | 2/4")
        .setDescription(
          "Veuiller sélectionner le feedback souhaité dans la liste ci-dessous"
        )
        .setThumbnail(
          "https://cdn-icons-png.flaticon.com/512/1087/1087804.png"
        );

      const templateSelectionRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("select-feedback-template")
          .setPlaceholder("Aucune réponse n'est sélectionnée")
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions(
            Object.values(database.modals).map((item, index) => {
              return {
                label: `[${item.title}]`,
                description: `${item.description}`,
                value: `${index},${item.title},${item.id}`,
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
    if (interaction.customId === "select-feedback-template") {
      const promotions = database.apprenants;

      const selectPromotionTypeEmbed = new EmbedBuilder()
        .setTitle("Sélectionner la catégorie de promotion | 3/4")
        .setColor(0x0099ff)
        .setDescription(
          `Veuillez sélectionner la catégorie de promotion concernée par le feedback **${
            interaction.values[0].split(",")[1]
          }**`
        )
        .setThumbnail(
          "https://cdn-icons-png.flaticon.com/512/1087/1087804.png"
        );

      const selectPromotionTypeRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("select-category-promotion")
          .setPlaceholder(
            "Aucune catégorie de promotion n'est actuellement selectionnée"
          )
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions(
            Object.keys(promotions.map((u) => u)[0]).map((promotion, index) => {
              return {
                label: `${promotion}`,
                description: `Promotion ${promotion}`,
                value: `${index},${promotion},${
                  interaction.values[0].split(",")[1]
                },${
                  interaction.values[0].split(",")[2]
                }`,
              };
            })
          )
      );
      await interaction.reply({
        embeds: [selectPromotionTypeEmbed],
        components: [selectPromotionTypeRow],
        ephemeral: true,
      });
    }
    if (interaction.customId === "select-category-promotion") {
      const promotions = database.apprenants;
      const selectedCategory =
        promotions[0][`${interaction.values[0].split(",")[1]}`];

      const selectPromotionEmbed = new EmbedBuilder()
        .setTitle("Sélection de promotion(s) | 4/4")
        .setColor(0x0099ff)
        .setDescription(
          `Veuillez sélectionner une ou plusieurs **formation** concernée par le feedback **${
            interaction.values[0].split(",")[2]
          }**. \n\n**Une fois la formation sélection le message sera envoyé à tous les apprenants de celle-ci**`
        )
        .setThumbnail(
          "https://cdn-icons-png.flaticon.com/512/1087/1087804.png"
        );

      const selectPromotionRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("select-promotion")
          .setPlaceholder("Aucune promotion n'est actuellement selectionnée")
          .setMinValues(1)
          .setMaxValues(Object.keys(selectedCategory).length)
          .addOptions(
            Object.keys(selectedCategory).map((item, index) => {
              return {
                label: `${item}`,
                description: `Sous-promotions de ${
                  interaction.values[0].split(",")[1]
                }`,
                value: `${index},${item},${
                  interaction.values[0].split(",")[1]
                },${interaction.values[0].split(",")[2]},${interaction.values[0].split(",")[3]}`,
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
    if (interaction.customId === "select-promotion") {
      const promotions = database.apprenants;

      interaction.values.map(async (element) => {
        const selectedCategory =
          promotions[0][`${interaction.values[0].split(",")[2]}`][
            `${element.split(",")[1]}`
          ];

        Object.values(selectedCategory).map(async (user) => {
          const learnerPmEmbed = new EmbedBuilder()
            .setTitle(`Feedback | ${interaction.values[0].split(",")[3]}`)
            .setColor(0x0099ff)
            .setDescription(
              `Bonjour ${
                Object.values(user)[1]
              },\n\nle membre du staff simplon **${
                interaction.member.displayName
              }** vous à envoyer un feedback. Pour y répondre veuillez Sélectionner la réponse **oui** dans la lise ci-dessous.\n\n Nous restons disponibles pour toutes questions.\n\nSite: https://hautsdefrance.simplon.co/\nDiscord: discord.gg/SimplonHDF\nEmail: contact@somplon.com`
            )
            .setTimestamp()
            .setThumbnail(
              "https://cdn-icons-png.flaticon.com/512/1087/1087804.png"
            );

          const learnerPmRow = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
            .setCustomId("learner-response")
            .setPlaceholder("Aucune réponse n'est actuellement selectionnée")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(
              {
                label: `Oui`,
                description: 'Cette réponse affichera le questionnaire.',
                value: `${interaction.values[0].split(",")[4]}`,
              }
            )
              
          );
          (await interaction.client.users.fetch(Object.values(user)[4])).send({
            embeds: [learnerPmEmbed],
            components: [learnerPmRow],
          });
        });
      });

      await interaction.reply({
        content: `La demande FeedBack **${
          interaction.values[0].split(",")[3]
        }** viens d'être envoyer au(x) apprenant(s).
      `,
        ephemeral: true,
      });
    }

    if (interaction.customId === "learner-response") {
      console.log(interaction.values)
      const input_list = database.modals[interaction.values[0]].inputs;

      const feedbackSelectionModal = new ModalBuilder()
      .setCustomId(database.modals[interaction.values[0]].customId)
      .setTitle(database.modals[interaction.values[0]].title);

      input_list.map((input) => {
        let actualInputStyle = input.style;
        let inputStyle =
          actualInputStyle === "Short"
            ? TextInputStyle.Short
            : TextInputStyle.Paragraph;
        feedbackSelectionModal.addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId(input.customId)
              .setLabel(input.label)
              .setStyle(inputStyle)
          )
        );
      });

      await interaction.showModal(feedbackSelectionModal);
    }
  }
});

client.login(DISCORD_TOKEN);
