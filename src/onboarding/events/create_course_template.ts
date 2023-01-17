import { Events, Message, StringSelectMenuInteraction } from "discord.js"
import { set, get } from "../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: StringSelectMenuInteraction) {
        if (!interaction.isStringSelectMenu() || interaction['customId'] != 'select-channels-formation') return;

        const selected = interaction.values.join(', ');

        const user_id = interaction.user.id;
        const data = await get("./config_courses.json");

        data[user_id].state = false

        const formations = {
            [data[user_id].formation_name]: interaction.values
        }
        set('./config.json', 'formations', formations);

        await interaction.reply('La formation a bien été créée')

    }
}