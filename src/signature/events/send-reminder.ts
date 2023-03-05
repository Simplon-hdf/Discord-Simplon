import {EmbedBuilder, Events, SelectMenuInteraction} from "discord.js";
import EmbedMessage from "../discord-builders/embed-builder";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: SelectMenuInteraction) {

        if (!interaction.isAnySelectMenu() || interaction['customId'] != 'select_learners') return;

        for (const learnerUuId of interaction.values) {
            const embedReminderLearner = new EmbedMessage(
                "Rappel de signature",
                '#0x0099ff',
                `Bonjour ! \n\n Votre formateur **${interaction.user.username}** vous a envoyé un rappel de signature ! \n\n`,
                "https://cdn-icons-png.flaticon.com/512/4896/4896860.png"
            )

            await (await interaction.client.users.fetch(learnerUuId)).send({
                embeds: [embedReminderLearner],
            })

            const embedResponse = new EmbedMessage(
                "Merci!",
                '#0x0099ff',
                `Votre demande a bien été prise en compte.`,
                "https://cdn-icons-png.flaticon.com/512/4896/4896860.png"
            )

            await interaction.reply({
                embeds: [embedResponse],
                ephemeral: true,
            });
        }
    }
}