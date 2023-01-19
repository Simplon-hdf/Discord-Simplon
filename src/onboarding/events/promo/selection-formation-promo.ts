import { ActionRowBuilder, Events, ModalActionRowComponentBuilder, ModalBuilder, StringSelectMenuInteraction, TextInputBuilder, TextInputStyle } from "discord.js"
import { set, get } from "../../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: StringSelectMenuInteraction) {
        if (!interaction.isStringSelectMenu() || interaction['customId'] != 'select-formation') return;

        const formation_name = interaction.values[0];
        const user_id = interaction.user.id;
        const data = await get('config_promo.json');
        
        data[user_id]['formation_name'] = formation_name;

        set('config_promo.json', user_id, data[user_id]);

        const modal = new ModalBuilder()
            .setCustomId('choice-promo-name')
            .setTitle('Choix du nom de la formation');

        const input = new TextInputBuilder()
            .setCustomId('input-name-promo')
            .setLabel('Entrer le nom de la promo')
            .setStyle(TextInputStyle.Short);

        const row = new ActionRowBuilder<ModalActionRowComponentBuilder>()
            .addComponents(input)

        modal.addComponents(row);

        await interaction.showModal(modal);
    }
}