import { EmbedBuilder } from "@discordjs/builders";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import * as fs from "fs";
import { set } from "../utils/json_utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName('create_course_interface')
        .setDescription('Setup the interface for course creation'),
    async execute(interaction : CommandInteraction){

        const embed = new EmbedBuilder()
            .setTitle('Création d\'une nouvelle promo');

        

    }
}