import {ActionRowBuilder, Events, SelectMenuInteraction, StringSelectMenuBuilder} from "discord.js";
import {Promo} from "../promo/promo";
import EmbedMessage from "../discord-builders/embed-builder";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: SelectMenuInteraction) {
        if (!interaction.isAnySelectMenu() || interaction['customId'] != 'select_promo') return;

        let selectedPromo = new Promo(interaction.values[0]);
        let learnerList = await selectedPromo.getLearners();

        const embedReminder = new EmbedMessage(
                "Sélection des apprenants pour Rappel",
                '#0x0099ff',
                `\n\n Veuillez sélectionner les apprenants à qui envoyer un rappel dans la liste ci-dessous.`,
                "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
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
                embeds: [embedReminder],
                components: [selectLearnersRow],
                ephemeral: true,
            });
    }
}
