import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Events,
    SelectMenuInteraction,
    StringSelectMenuBuilder
} from "discord.js";
import {Promo} from "../promo/promo";
import EmbedMessage from "../discord-builders/embed-builder";
import {Trainer} from "../users/trainer";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: SelectMenuInteraction) {
        if (!interaction.isAnySelectMenu() || interaction['customId'] !== 'select_promo') return;

        let selectedPromo = new Promo(interaction.values[0]);
        let learnerList = await selectedPromo.getLearners();
        const trainer = new Trainer(interaction.user.id);

        const embedReminder = new EmbedMessage(
                "Sélection des apprenants pour Rappel",
                '#0x0099ff',
                `\n\n Veuillez sélectionner les apprenants à qui envoyer un rappel dans la liste ci-dessous.`,
                "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
        )

        const deactivateButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId('deactivate')
                .setLabel(`désactiver la code request`)
                .setStyle(ButtonStyle.Danger),
        )

            const selectLearnersRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("select_learners")
                    .setPlaceholder("Aucune réponse n'est actuellement sélectionnée !")
                    .setMinValues(1)
                    .setMaxValues(learnerList.length)
                    .addOptions(learnerList.map((learner: any) => {
                            return {
                                label: `[${learner.username}]`,
                                description: `Envoyer un rappel à ${learner.username}`,
                                value: `${learner.user_uuid}`,
                            };
                        })
                    ))
            await interaction.reply({
                content: interaction.values[0],
                embeds: [embedReminder],
                components: [selectLearnersRow, deactivateButton],
                ephemeral: true,
            });
        setTimeout(() => interaction.deleteReply(), 60000);
    }
}
