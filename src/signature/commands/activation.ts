import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Interaction,
    SlashCommandBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('active')
        .setDescription('Run this commands to activate the bot'),
    async execute(interaction: ChatInputCommandInteraction) {
        const beginProcedure = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Commencer la procédure de rappel de signature")
            .setDescription(
                `\n\n Bonjour ${interaction.member?.user.username}, \n\n pour commencer la procédure de rappel de signature veuillez cliquer sur le bouton ci-dessous.`
            )
            .setThumbnail(
                "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
            );
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId("start")
                .setLabel("Commencer la procédure !")
                .setStyle(ButtonStyle.Success)
        );
        await interaction.reply({embeds: [beginProcedure], components: [row]});
    },
};