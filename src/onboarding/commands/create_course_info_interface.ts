import { ActionRowBuilder, CommandInteraction, EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder } from "discord.js";
import * as fs from "fs";
import { set } from "../utils/json_utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName('create_course_interface')
        .setDescription('Setup the interface for course creation'),
    async execute(interaction : CommandInteraction){

        const embed = new EmbedBuilder()
            .setTitle('Information des formations créées');


        const button = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('display-info')
                    .setPlaceholder('Afficher les informations des cours.')

            )

    }
}