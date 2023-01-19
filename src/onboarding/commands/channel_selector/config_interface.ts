import { channel } from "diagnostics_channel";
import { ActionRowBuilder, APISelectMenuOption, CommandInteraction, EmbedBuilder, RestOrArray, SelectMenuComponentOptionData, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { get, set } from "../../utils/json_utils.js";


export default {
    data: new SlashCommandBuilder()
        .setName('config_selector')
        .setDescription('Permet d\afficher l\'interface du onboarding selector'),
    async execute(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const embed = new EmbedBuilder()
            .setTitle('Sélectionner les catégories qui vous interrèsses.')
            .setDescription('Donne le visuel sur certain channel')



        const data = await get('./config_courses.json');

        const keys = Object.keys(data['formations']);

        let promos = [];

        keys.forEach(obj => {
            promos = data['formations'][obj]['promos'];

        })


        console.log(promos);

        const options: RestOrArray<StringSelectMenuOptionBuilder | APISelectMenuOption | SelectMenuComponentOptionData> = [];

        promos.forEach(promo => {
            options.push({
                label: promo,
                description: 'Promotion au nom de ' + promo,
                value: promo
            })
        });

        if (promos.length > 0) {
            const row = new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('onboarding-selector')
                        .setPlaceholder('Selectionner vos channels')
                        .setMinValues(0)
                        .setMaxValues(options.length)
                        .addOptions(options)
                )
            const message = await interaction.channel?.send({ embeds: [embed], components: [row] });
            set('./config_promo.json', 'message_info_selector', message?.id);
            set('./config_promo.json', 'channel_info_selector', interaction.channel?.id);
            return;
        }
        await interaction.channel?.send({ embeds: [embed]});
    }
}