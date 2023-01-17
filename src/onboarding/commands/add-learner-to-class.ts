import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, UserSelectMenuBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Define config'),

    async execute(interaction: CommandInteraction) {

        const action_buttons_row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('add-learner')
                    .setLabel('Ajouter')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('remove-learner')
                    .setLabel('Retirer')
                    .setStyle(ButtonStyle.Danger),
            );

        await interaction.reply({ content: 'Ui', ephemeral: true, components: [action_buttons_row] });
    },

}