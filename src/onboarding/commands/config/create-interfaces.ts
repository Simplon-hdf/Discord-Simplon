import {CommandInteraction, SlashCommandBuilder} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Permet d\ajouter les interfaces de configuration')
    .addSubcommand(subcommand => {
      return subcommand.setName('formation')
        .setDescription('Permet de creer l\'interface de creation de formation');
    }),
  async execute(interaction: CommandInteraction) {
    if(!interaction.isCommand()) return;
    const arg = interaction.options.get('arg');
    await interaction.reply('Pong!')
  }
}