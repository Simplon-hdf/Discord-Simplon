import {
  Client,
  Events,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  EmbedBuilder,
} from "discord.js";
import commands_handler from "./handlers/deploy-comands.js";
import * as dotenv from "dotenv";
import database from "./database/db.json" assert { type: "json" };

dotenv.config();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

commands_handler(client, DISCORD_TOKEN, CLIENT_ID);

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "active") {
      console.log(interaction.guild.roles.cache.forEach((role) => role));
      const embedReminder = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Commencer la procédure de rapelle de signature")
        .setDescription(
          `\n\n Bonjour ${interaction.member.displayName}, \n\n pour commencer la procédure de rapelle de signature veuillez cliquer sur le bouton ci-dessous.`
        )
        .setThumbnail(
          "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
        );

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("active")
          .setLabel("Commencer la procédure !")
          .setStyle(ButtonStyle.Success)
      );

      await interaction.reply({ embeds: [embedReminder], components: [row] });
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === "active") {
      if (interaction.member.roles.cache.has("1064925613120557196")) {
        const learner_list = Array.from(database.Apprenants);

        const embedReminder = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Sélection des apprenants pour le rappeler")
          .setDescription(
            `\n\n Bonjour ${interaction.member.displayName}, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer via la liste de sélection ci-dessous.`
          )
          .setThumbnail(
            "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
          );

        const row = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("select_learners")
            .setPlaceholder("Aucune réponse est actuellement sélectionner !")
            .setMinValues(1)
            .setMaxValues(learner_list.length)
            .addOptions(
              learner_list.map((learner) => {
                return {
                  label: `[${learner.firstname} ${learner.lastname}]`,
                  description: `Formation: ${
                    interaction.guild.roles.cache.get(learner.roles).name
                  }`,
                  value: `${learner.discord_id}, ${learner.firstname}, ${
                    learner.lastname
                  }, ${
                    interaction.guild.roles.cache.get(learner.roles).name
                  }, ${interaction.member.displayName}`,
                };
              })
            )
        );
        await interaction.reply({
          embeds: [embedReminder],
          components: [row],
          ephemeral: true,
        });
      }
    }
  } else if (interaction.isAnySelectMenu()) {
    if (interaction.customId === "select_learners") {
      const userObject = interaction.values[0].split(",");
      const embedReminderLearner = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Rapelle de signature")
        .setDescription(
          `Bonjour ${userObject[1]}, \n\n Votre formateur **${
            interaction.values[0].split(",")[4]
          }** vous à envoyer un rappelle de signature pour votre formation **${userObject[3]
            .split("-")
            .join(" ")
            .toUpperCase()}**\n\n  Vous pourrez retrouver le code dans le salon: <#1062684179164307476> \n`
        )
        .setThumbnail("https://cdn-icons-png.flaticon.com/512/4489/4489772.png")
        .setTimestamp();

      interaction.values.forEach(async (discordId) =>
        (await interaction.client.users.fetch(discordId.split(",")[0])).send({
          embeds: [embedReminderLearner],
        })
      );
    }
  }
});

client.login(DISCORD_TOKEN);
