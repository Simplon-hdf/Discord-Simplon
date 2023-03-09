import {ButtonInteraction, Events, SelectMenuInteraction} from "discord.js";
import {Learner} from "../users/learner";
import EmbedMessage from "../discord-builders/embed-builder";
import {Trainer} from "../users/trainer";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: SelectMenuInteraction) {
        if (!interaction.isAnySelectMenu() || interaction['customId'] !== 'select_trainer') return;

        const trainerUuid = interaction.values[0];

        const learner = new Learner(interaction.user.id);
        const codeRequest = await learner.codeRequest(trainerUuid);

        const codeRequestEmbed = new EmbedMessage(
            "Merci!",
            '#0x0099ff',
            `\n\n Merci ${interaction.user.username}! \n \n Votre demande a bien été prise en compte.`,
            "https://img.icons8.com/ios-filled/100/null/happy--v1.png"
        )

        await interaction.reply({
            embeds: [codeRequestEmbed],
            ephemeral: true,
        });

        if (codeRequest) {
            const trainerCodeRequest = new EmbedMessage(
                "Code Request!",
                '#0x0099ff',
                `\n \n Bonjour! Vos apprenants réclament le code! `,
                "https://cdn-icons-png.flaticon.com/512/4896/4896860.png"
            )
            await (await interaction.client.users.fetch(trainerUuid)).send({
                embeds: [trainerCodeRequest],
            })
        }

    }
}