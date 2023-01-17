import {
  Client, Collection, Events, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle,
} from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config();
const { DISCORD_TOKEN } = process.env;
const { DISCORD_ID } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./signature/commands').filter((file) => file.endsWith('.js'));

(async () => { for (const filePath of commandFiles) {
  const command = await import(`./commands/${filePath}`);
  client.commands.set(command.default.data.name, command.default);
}})();

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(DISCORD_TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

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
});
