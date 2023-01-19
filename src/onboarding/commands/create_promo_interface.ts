import { EmbedBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { set } from "../utils/json_utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName('config_promo_interface')
        .setDescription('Setup the interface for course creation'),
    async execute(interaction : CommandInteraction){

        const embed = new EmbedBuilder()
            .setTitle('Création d\'une nouvelle promo');

        const button = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('start-promo-creation')
                    .setLabel('Creer une nouvelle promotion')
                    .setStyle(ButtonStyle.Primary)
            );

        set('config_promo.json', 'channel', interaction.channel?.id);

        await interaction.channel?.send({embeds : [embed], components : [button]});
        // setTimeout(async () => await interaction.editReply({content : "L'interface à bien été créée"}));
    }
}