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

      const embedReminder = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Commencer la procédure de rappel de signature")
        .setDescription(
          `\n\n Bonjour ${interaction.member.displayName}, \n\n pour commencer la procédure de rappel de signature veuillez cliquer sur le bouton ci-dessous.`
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
          .setTitle("Sélection des apprenants pour Rappel")
          .setDescription(
            `\n\n Bonjour ${interaction.member.displayName}, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer dans la liste de sélection ci-dessous.`
          )
          .setThumbnail(
            "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
          );

        const row = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("select_learners")
            .setPlaceholder("Aucune réponse n'est actuellement sélectionnée !")
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
      else if (interaction.member.roles.cache.has("1064925679193444473")) {
        const trainer_list = Array.from(database.Formateurs);
        
        const embedRequest = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Sélection du formateur du jour")
          .setDescription(
            `\n\n Bonjour ${interaction.member.displayName}, \n\n Veuillez sélectionner le formateur du jour afin de lui envoyer une demande de code.`
          )
          .setThumbnail("https://cdn-icons-png.flaticon.com/512/4489/4489772.png");

          const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId("select_trainer")
              .setPlaceholder("Aucune réponse n'est actuellement sélectionnée !")
              .setMinValues(1)
              .setMaxValues(trainer_list.length)
              .addOptions(
                trainer_list.map((trainer) => {
                  return {
                    label: `[${trainer.firstname} ${trainer.lastname}]`,
                    description: `${
                      interaction.guild.roles.cache.get(trainer.roles).name
                    }`,
                    value: `${trainer.discord_id}, ${trainer.firstname}, ${
                      trainer.lastname
                    }, ${
                      interaction.guild.roles.cache.get(trainer.roles).name
                    }, ${interaction.member.displayName}`,
                  };
                })
              )
          );
          await interaction.reply({
            embeds: [embedRequest],
            components: [row],
            ephemeral: true,
          });
      }
    }
  } else if (interaction.isAnySelectMenu()) {
    if (interaction.customId === "select_learners") {

      interaction.values.forEach(async (discordId) =>{
        const embedReminderLearner = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Rappel de signature")
          .setDescription(
            `Bonjour ${discordId.split(",")[1]}, \n\n Votre formateur **${
              discordId.split(",")[4]
            }** vous a envoyé un rappel de signature pour votre formation **${discordId.split(",")[3].split("-").join(" ").toUpperCase()}**\n\n  Vous pourrez retrouver le code dans le salon: <#1062684179164307476> \n`
          )
          .setThumbnail("https://cdn-icons-png.flaticon.com/512/4489/4489772.png")
          .setTimestamp();

        (await interaction.client.users.fetch(discordId.split(",")[0])).send({
          embeds: [embedReminderLearner],
        })
        const embedResponse = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Merci!")
          .setDescription(
            `Votre demande a bien été prise en compte.`
          )

          await interaction.reply({
            embeds: [embedResponse],
            ephemeral: true,
          });
    });
    }
    if (interaction.customId === 'select_trainer') {
      interaction.values.forEach(async (discordId) =>{
        const embedReminderLearner = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Rappel de signature")
          .setDescription(
            `Bonjour ${discordId.split(",")[1]}, \n\n Votre apprenant **${
              discordId.split(",")[4]
            }** vous a envoyé une demande de code pour la formation **CDA VALS P2**\n\n`
          )
          .setThumbnail("https://cdn-icons-png.flaticon.com/512/4489/4489772.png")
          .setTimestamp();

        (await interaction.client.users.fetch(discordId.split(",")[0])).send({
          embeds: [embedReminderLearner],
        })
        const embedResponse = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Merci!")
          .setDescription(
            `Votre demande a bien été prise en compte.`
          )

          interaction.reply({
            embeds: [embedResponse],
            ephemeral: true,
          });
    });
    };
  }
})

client.login(DISCORD_TOKEN);
