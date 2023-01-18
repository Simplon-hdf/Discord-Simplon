import { ActionRowBuilder, APISelectMenuOption, ChannelType, Events, Message, ModalSubmitInteraction, RestOrArray, SelectMenuComponentOptionData, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js"
import { set, get } from "../../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ModalSubmitInteraction) {
        if (!interaction.isModalSubmit() || interaction['customId'] != 'name-modals-formation') return;
        
    }
}