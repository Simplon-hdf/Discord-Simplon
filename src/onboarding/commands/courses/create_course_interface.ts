import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { set } from "../../utils/json_utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName('interface_course_create')
        .setDescription('Setup the interface for course creation'),
    async execute(interaction : CommandInteraction){

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('start_course_creation')
                    .setLabel('Commencer la création')
                    .setStyle(ButtonStyle.Success)
            )

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Interface de création de nouvelles formations")
            .setDescription('Clique sur le bouton pour commencer à configurer une nouvelle formation')
            .setThumbnail('https://cdn-icons-png.flaticon.com/512/8690/8690256.png');

        set('./config_courses.json', 'channel_id', interaction.channel?.id)
        
        await interaction.channel?.send({ embeds : [embed], components: [row]});
        await interaction.deferReply({ephemeral: true})
        setTimeout(async () => await interaction.editReply({content : "L'interface a bien été crée"}));
    }
}