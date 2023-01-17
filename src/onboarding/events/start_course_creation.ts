import { ActionRowBuilder, ButtonInteraction, EmbedBuilder, Events, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import { set, get } from "../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {
        if (!interaction.isButton() || interaction['customId'] != 'start_course_creation') return;

        const channel = interaction.channelId;

        const state = get('./config.json')['config_state_course_creation'];

        if (state && state != undefined) {
            await interaction.reply({ content: 'La configuration est déja en cours', ephemeral: true });
            return;
        }


        const modal = new ModalBuilder()
            .setCustomId('name-modals-formation')
            .setTitle('Nom de la formation');

        const inputName = new TextInputBuilder()
            .setCustomId('name-input-formations')
            .setLabel('Entrer le nom de la formation')
            .setStyle(TextInputStyle.Short);

        const action_row = new ActionRowBuilder<TextInputBuilder>().addComponents(inputName);

        modal.addComponents(action_row)

        await interaction.showModal(modal);

        set('./config_courses.json', interaction.user.id, {'state': true});
    }
}