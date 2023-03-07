import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";

export default {
    data: new ButtonBuilder()
        .setCustomId('test-button')
        .setLabel('Test')
        .setStyle(ButtonStyle.Primary),
    async execute(interaction : ButtonInteraction) {
        await interaction.reply('Oui');
    },
}