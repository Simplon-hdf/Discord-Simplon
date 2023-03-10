import { ActionRowBuilder, ButtonInteraction, Events, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { get } from '../../../utils/json_utils.js'

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {
        if(interaction.guild == null || interaction.member?.user.id == null) return;
        if (!interaction.isButton() || interaction['customId'] != 'id-start') return;

        const id_request : String = JSON.stringify(await get('./identifications-requests.json'));

        if(id_request.includes(interaction.member.user.id)) { //Identification for this user has been found
            await interaction.reply({content: 'Votre demande d\'identification est en cours de vérification', ephemeral: true});
            return;
        }

        const to_display_modal = new ModalBuilder()
            .setCustomId('id-req-mod')
            .setTitle('Renseignez vos informations')
        const first_field = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId('lastname')
                    .setLabel('Nom')
                    .setStyle(TextInputStyle.Short)
            );
        const second_field = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId('firstname')
                    .setLabel('Prénom')
                    .setStyle(TextInputStyle.Short)
            )
        const third_field = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId('email')
                    .setLabel('Adresse e-mail')
                    .setStyle(TextInputStyle.Short)
            )
        const fourth_field = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId('factory-name')
                    .setLabel('Où se situe votre fabrique ? (Optionnel)')
                    .setRequired(false)
                    .setStyle(TextInputStyle.Short)
            )
        to_display_modal.addComponents(first_field, second_field, third_field, fourth_field);
        await interaction.showModal(to_display_modal);
    }
}