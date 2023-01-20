import { ActionRowBuilder, APISelectMenuOption, EmbedBuilder, Events, ModalSubmitInteraction, RestOrArray, SelectMenuComponentOptionData, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js"
import { set, get } from "../../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ModalSubmitInteraction) {
        if (!interaction.isModalSubmit() || interaction['customId'] != 'name-modals-formation') return;

        const name = interaction.fields.getTextInputValue('name-input-formations');
        const data = await get('./config_courses.json');

        const formation_data = {
            [name]: {
                'name' : name
            }
        };
        set('./config_courses.json', 'formations', formation_data);

        const template_id = data['template'];
        const channels = interaction.guild?.channels.cache.filter(channel => channel.type == 0 && channel.parentId == template_id);
        const options: RestOrArray<StringSelectMenuOptionBuilder | APISelectMenuOption | SelectMenuComponentOptionData> = []

        channels?.forEach(element => {
            options.push({
                label: element.name,
                description: "Channel de discussion",
                value: element.id
            });
        });

        const embed = new EmbedBuilder()
            .setTitle('Selectionne les channels pour la promotions')
            .setDescription('Permet d\'ajouter les différents channel pour la promo en cours de création')
            .setThumbnail('https://cdn-icons-png.flaticon.com/512/5678/5678695.png');


        const select_menu = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select-channels-formation')
                    .setPlaceholder('Liste de channels')
                    .addOptions(options)
                    .setMinValues(1)
                    .setMaxValues(options.length)
            )


        interaction.reply({ ephemeral: true, embeds: [embed], components: [select_menu] });
        set('./config_courses.json', interaction.user.id, { 'state': true, 'formation_name': name });

    }

}