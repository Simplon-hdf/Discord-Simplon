import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, GuildTextBasedChannel, SlashCommandBuilder, TextInputBuilder, TextInputStyle, UserSelectMenuBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('add-identification-message')
        .setDescription('Define config'),

    async execute(interaction: CommandInteraction) {
        const action_buttons_row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('id-start')
                    .setLabel('S\'identifer')
                    .setStyle(ButtonStyle.Success),
            );
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Demande d\'accès au serveur')
            .setDescription('Veuillez cliquer sur ce bouton pour faire une demande d\'identification')
        await interaction.channel?.send({embeds: [embed], components: [action_buttons_row] });
    },

}