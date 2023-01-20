import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { set } from "../utils/json_utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName('create_course_interface')
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
            .setThumbnail('https://www.flaticon.com/free-icon/add_8690256?term=create&page=1&position=53&origin=search&related_id=8690256');

        set('./config_courses.json', 'channel_id', interaction.channel?.id)
        
        await interaction.channel?.send({ embeds : [embed], components: [row]});
        await interaction.deferReply({ephemeral: true})
        setTimeout(async () => await interaction.editReply({content : "L'interface a bien été crée"}));
    }
}