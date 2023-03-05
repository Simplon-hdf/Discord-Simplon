import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Interaction,
    SlashCommandBuilder
} from 'discord.js';
import EmbedMessage from "../discord-builders/embed-builder";
import {ButtonBuilderClass} from "../discord-builders/button-builder";

export default {
    data: new SlashCommandBuilder()
        .setName('active')
        .setDescription('Run this commands to activate the bot'),
    async execute(interaction: ChatInputCommandInteraction) {
        const beginProcedure = new EmbedMessage(
            "Commencer la procédure de rappel de signature",
            "#0x0099ff",
            `\n\n Bonjour ${interaction.member?.user.username}, \n\n pour commencer la procédure de rappel de signature veuillez cliquer sur le bouton ci-dessous.`,
            "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
        )

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilderClass(
                "start",
                ButtonStyle.Success,
                "Commencer la procédure !"
            )
        );
        await interaction.reply({embeds: [beginProcedure], components: [row]});
    },
};