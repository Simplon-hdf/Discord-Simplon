import { APIEmbedField, EmbedBuilder, Events, RestOrArray, StringSelectMenuInteraction } from "discord.js"
import { set, get } from "../../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: StringSelectMenuInteraction) {
        if (!interaction.isStringSelectMenu() || interaction['customId'] != 'display-info-courses') return;

        const value = interaction.values[0];

        const data = await get('./config_courses.json');
        const courses_data = data['formations'][value];

        const channels = interaction.guild?.channels.cache.filter(channel => courses_data.includes(channel.id));

        
        const fields : RestOrArray<APIEmbedField> =  [
            {name: 'Nom de la formation : ', value : value},
        ]

        channels?.forEach(channel => {
            fields.push({name : 'Channel de formation : ', value : channel.name})
        })

        const embed = new EmbedBuilder()
            .setTitle('Information de la formation ' + value)
            .addFields(fields);

            await interaction.reply({ephemeral : true, embeds : [embed]})

    }
}