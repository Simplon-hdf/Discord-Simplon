import { Events, Message, StringSelectMenuInteraction } from "discord.js"
import { set, get } from "../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction : StringSelectMenuInteraction) {
        if(!interaction.isStringSelectMenu() || interaction['customId'] != 'select-channels-formation') return;

    }
}