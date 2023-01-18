import { ActionRowBuilder, APISelectMenuOption, ButtonInteraction, EmbedBuilder, Events, ModalActionRowComponentBuilder, ModalBuilder, RestOrArray, SelectMenuComponentOptionData, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import { set, get } from "../../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {
        if (!interaction.isButton() || interaction['customId'] != 'start-promo-creation') return;

        const embed = new EmbedBuilder()
            .setTitle('Choix de la formation')
            .setDescription('Choisissez une formation à la quelle sera assigné la nouvelle promotion');

        const options: RestOrArray<StringSelectMenuOptionBuilder | APISelectMenuOption | SelectMenuComponentOptionData> = [];

        const data_courses = await get('config_courses.json');
        const formations : {} = await data_courses['formations'];

        const formations_name = Object.keys(formations);

        formations_name.forEach(name => {
            options.push({
                label : name,
                description : 'Formation disponible',
                value : name
            })
        });
        

        const select_menu = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select-formation')
                    .setPlaceholder('Liste des formations')
                    .addOptions(options)
            );

        await interaction.reply({embeds : [embed], ephemeral : true, components : [select_menu]});
        set('./config_promo.json', interaction.user.id, {'state': true});

    }
}