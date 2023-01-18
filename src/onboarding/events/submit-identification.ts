import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, Events, GuildTextBasedChannel, ModalBuilder, ModalData, ModalSubmitFields, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ModalSubmitInteraction) {
        if (!interaction.isModalSubmit() || interaction.customId != 'id-req-mod') return;
        const lastname: String = interaction.fields.getTextInputValue('lastname');
        const firstname: String = interaction.fields.getTextInputValue('firstname');
        const email: String = interaction.fields.getTextInputValue('email');
        const factory_name: String = interaction.fields.getField('factory-name')['value'];
        const to_display_embed = factory_name == '' ? new EmbedBuilder()
            .setTitle('Demande d\'identification')
            .addFields(
                { name: 'Nom', value: `${lastname}` },
                { name: 'Prénom', value: `${firstname}` },
                { name: 'Adresse mail', value: `${email}` },
            )
            : new EmbedBuilder()
                .setTitle('Demande d\'identification')
                .addFields(
                    { name: 'Nom', value: `${lastname}` },
                    { name: 'Prénom', value: `${firstname}` },
                    { name: 'Adresse mail', value: `${email}` },
                    { name: 'Nom de la fabrique', value: `${factory_name}` }
                )
        const buttons_row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('accept-id-req')
                    .setLabel('Confirmer l\'identification')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('reject-id-req')
                    .setLabel('Refuser l\'identification')
                    .setStyle(ButtonStyle.Danger),
            )
        const to_send_channel : GuildTextBasedChannel = (await interaction.guild?.channels.cache.get('1065212511714017340') as GuildTextBasedChannel)
        to_send_channel.send({
            embeds: [to_display_embed],
            components: [buttons_row]
        })
        await interaction.reply({ content: 'Votre demande d\'identification a bien été prise en compte', ephemeral: true });

    }
}