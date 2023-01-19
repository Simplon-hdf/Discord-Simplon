import {
  Client,
  Events,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  EmbedBuilder,
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
      
      const optionConstructor = (modal_list) => {
        for (let modal in modal_list) {
          return {
            label: `[${modal.title}]`,
            description: `${modal.description}`,
            value: `${modal.customId}`,
          };
        }
      }

      const templateSelectionEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Sélection du feedBack')
        .setDescription(
          'Veuiller sélectionner le feedback souhaité dans la liste ci-dessous'
        )
        .setThumbnail(
          'https://cdn-icons-png.flaticon.com/512/1087/1087804.png'
        );

      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select_template')
          .setPlaceholder("Aucune réponse n'est sélectionnée")
          .setMinValues(1)
          .setMaxValues(5)
          .addOptions(optionConstructor(database.modals))     
      );

      await interaction.reply({
        embeds: [templateSelectionEmbed],
        components: [row],
        ephemeral: true,
      });

    }
  }
});

client.login(DISCORD_TOKEN);
