import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import * as fs from "fs";
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
            .addFields(
                {name: "Guide", value: "Cliquer sur le bouton pour commencer à configurer une nouvelle formation"}
            )
            .setFooter({text: "Interface config"});

        await interaction.channel?.send({ embeds : [embed], components: [row]});
        await interaction.deferReply({ephemeral: true})
        setTimeout(async () => await interaction.editReply({content : "L'interface à bien été créée"}));
    }
}