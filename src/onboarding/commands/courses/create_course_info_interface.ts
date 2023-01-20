import { ActionRowBuilder, APISelectMenuOption, CommandInteraction, EmbedBuilder, RestOrArray, SelectMenuComponentOptionData, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { set, get } from "../../utils/json_utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName('interface_course_informations')
        .setDescription('Setup the interface for course creation'),
    async execute(interaction: CommandInteraction) {

        const embed = new EmbedBuilder()
            .setTitle('Renseignements sur les formations créées')
            .setDescription('Ce menu vous permettra d\'afficher les informations')
            .setThumbnail('https://www.flaticon.com/free-icon/list_6593002?term=informations+list&page=1&position=37&origin=searchrelated_id=6593002');

        const data = await get('./config_courses.json');
        const formations_data = data['formations'];

        const formations_name = Object.keys(formations_data);
        const options: RestOrArray<StringSelectMenuOptionBuilder | APISelectMenuOption | SelectMenuComponentOptionData> = []

        formations_name.forEach(name => {

            options.push(
                {
                    label : 'Formation au nom de ' + name,
                    value: name
                }
            )

        });

        const button = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('display-info-courses')
                    .setPlaceholder('Afficher les informations des cours.')
                    .addOptions(options)
            )

        

        await interaction.reply({embeds : [embed], components : [button]})
    }
}