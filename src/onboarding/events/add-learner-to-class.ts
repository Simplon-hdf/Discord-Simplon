import { ActionRowBuilder, ButtonInteraction, Events, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {
        if (!interaction.isButton() || interaction['customId'] != 'add-learner') return;
        const modal = new ModalBuilder()
            .setCustomId('confirm-add-learner')
            .setTitle('My Modal');
        const test = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId('username-selection')
                    .setLabel('Entrer le nom de l\'utilisateur')
                    .setStyle(TextInputStyle.Short)
            );
        modal.addComponents(test);
        await interaction.showModal(modal);
    }
}