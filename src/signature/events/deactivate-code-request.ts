import {ButtonInteraction, Events, PermissionsBitField} from "discord.js";
import {Trainer} from "../users/trainer";
import EmbedMessage from "../discord-builders/embed-builder";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {

        if (!interaction.isButton() || interaction['customId'] !== 'deactivate' ) return;

        const selectedPromoId = interaction.message.content;

        const trainer = new Trainer(interaction.user.id);

        const deactivate = await trainer.deactivateCodeRequest(selectedPromoId);

            if (deactivate) {

                const confirmationEmbed = new EmbedMessage(
                    "Merci !",
                    "#0x0099ff",
                    `Bonjour ${interaction.user.username}, vos apprenants ne peuvent plus utiliser leur fonction de rappel pour la demi-journée`,
                    "https://cdn-icons-png.flaticon.com/512/4896/4896860.png"
                )

                await interaction.reply({
                    embeds: [confirmationEmbed],
                    ephemeral: true
                })
                setTimeout(() => interaction.deleteReply(), 30000);
            }
    }
}

