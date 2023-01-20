import { APIEmbedField, EmbedBuilder, Events, RestOrArray, StringSelectMenuInteraction } from "discord.js"
import { get } from "../../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: StringSelectMenuInteraction) {
        if (!interaction.isStringSelectMenu() || interaction['customId'] != 'display-info-courses') return;

        const value = interaction.values[0];

        const data = await get('./config_courses.json');
        const courses_data = data['formations'][value]['channels'];

        const channels = interaction.guild?.channels.cache.filter(channel => courses_data.includes(channel.id));

        
        const fields : RestOrArray<APIEmbedField> =  [
            {name: 'Nom de la formation : ', value : value},
        ]

        channels?.forEach(channel => {
            fields.push({name : 'Channel de formation : ', value : channel.name})
        })

        const embed = new EmbedBuilder()
            .setTitle('Renseignements sur la formation :  ' + value)
            .addFields(fields)
            .setThumbnail('https://www.flaticon.com/free-icon/list_6593002?term=informations+list&page=1&position=37&origin=searchrelated_id=6593002');

            await interaction.reply({ephemeral : true, embeds : [embed]})

    }
}