import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,

    SlashCommandBuilder
} from 'discord.js';
import EmbedMessage from "../discord-builders/embed-builder";


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
            new ButtonBuilder()
                .setCustomId("trainer")
                .setLabel("Rappeler un apprenant")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('learner')
                .setLabel("Demander le code")
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("deactivate_code_request")
                .setStyle(ButtonStyle.Secondary)
                .setLabel("Cliquez ici pour activer / désactiver la fonction de Code Request pour les apprenants")
        )
        await interaction.reply({embeds: [beginProcedure], components: [row]});
    },
};