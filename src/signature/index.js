import {
  Client, Events, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle,
} from 'discord.js';
import commands_handler from './handlers/deploy-comands.js'
import * as dotenv from 'dotenv';

dotenv.config();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

commands_handler(client, DISCORD_TOKEN, CLIENT_ID);

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()){
    if (interaction.commandName === 'active') {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('active')
            .setLabel('Active Me!')
            .setStyle(ButtonStyle.Primary),
        );
  
      await interaction.reply({ content: 'Click the button to active me!', components: [row] });
    }
  } else if(interaction.isButton()){
    if(interaction.customId === "active"){
      if (interaction.member.roles.cache.has('1064925613120557196')) {
        interaction.reply('test');
      }
    }
  }
});

client.login(DISCORD_TOKEN);
