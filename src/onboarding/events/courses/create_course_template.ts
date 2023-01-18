import { Events, Message, StringSelectMenuInteraction } from "discord.js"
import { set, get } from "../../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: StringSelectMenuInteraction) {
        if (!interaction.isStringSelectMenu() || interaction['customId'] != 'select-channels-formation') return;

        const selected = interaction.values.join(', ');

        const user_id = interaction.user.id;
        const data = await get("./config_courses.json");

        const formation_name = data[user_id]['formation_name'];
        const formation_data = data['formations'];

        formation_data[formation_name] = interaction.values

        set('./config_courses.json', 'formations', formation_data);


        const user_data = data[interaction.user.id];

        user_data['state'] = false;

        set('./config_courses.json', user_id, user_data);


        await interaction.reply('La formation a bien été créée')

    }
}