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
        .setTitle("Configuration feedback")
        .setDescription(
          `Bonjour, \n\n pour commencer la procédure de configuration de feedback, veuillez cliquer sur un des boutons ci-dessous.`
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
        .setTitle("Sélection du feedBack | 1/3")
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
        .setTitle("Sélectionner la catégorie de promotion | 2/3")
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
                },${interaction.values[0].split(",")[2]}`,
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
        .setTitle("Sélection de promotion(s) | 3/3")
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
                },${interaction.values[0].split(",")[2]},${
                  interaction.values[0].split(",")[3]
                }`,
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
              }** vous à envoyer un feedback. Pour y répondre veuillez Sélectionner une réponse dans la lise ci-dessous.\n\n Nous restons disponibles pour toutes questions.\n\nSite: https://hautsdefrance.simplon.co/\nDiscord: discord.gg/SimplonHDF\nEmail: contact@somplon.com`
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
                  label: `Oui, Anonyme`,
                  description: "Votre nom et prénom apparaîtrons pas.",
                  value: `${interaction.values[0].split(",")[4]}, 0`,
                },
                {
                  label: `Oui, Non Anonyme`,
                  description: "Votre nom et prénom apparaîtrons.",
                  value: `${interaction.values[0].split(",")[4]}, 1`,
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
      const input_list =
        database.modals[interaction.values[0].split(",")[0]].inputs;

      const feedbackSelectionModal = new ModalBuilder()
        .setCustomId(`${interaction.values[0].split(",")[0]}, ${interaction.values[0].split(",")[1]}`)
        .setTitle(database.modals[interaction.values[0].split(",")[0]].title);

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
  if (interaction.isModalSubmit()) {
    
    const fields = interaction.fields.fields;
    const fieldValue = fields.map(e => e.value);
    const actualFeedback = database.modals[interaction.customId.split(',')[0].trim()];
    const channel = client.channels.cache.get("1066503603545702521");

    const username = interaction.customId.split(',')[1].trim() === "0" ? "Anonyme" : interaction.user.username;
    
      global.postResponseEmbed = new EmbedBuilder()
        .setTitle(
          `Feedback | ${actualFeedback['title']} | ${username}`
        )
        .setDescription(` \n\nBonjour,\n\n l'apprenant **${username}** viens de répondre au feeback intitulé **${actualFeedback['title']}**.\n\n Vous trouverez ci'dessous ses réponses.\n\n`)
        .setColor(0x0099f)
        .setTimestamp()
        .setThumbnail(
          "https://cdn-icons-png.flaticon.com/512/1087/1087804.png"
        );
        for (let i = 0; i < fieldValue.length; i++) {

          postResponseEmbed.addFields({
            name: `${i + 1}.  **${actualFeedback['inputs'][i].label}**`,
            value: `${fieldValue[i]}`,
            inline: false,
          });
        }
    channel.send({ embeds: [postResponseEmbed] });
    interaction.reply({ content: `👌🏻 Votre réponse au feedback **${actualFeedback['title']}** a bien était envoyer en tant que: ${username}.` , ephemeral: true});
  }
});

client.login(DISCORD_TOKEN);
