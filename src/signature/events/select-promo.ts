import {
    Events,
    PermissionsBitField,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    Interaction, ButtonInteraction
} from "discord.js";
import {Trainer} from "../users/trainer";
import EmbedMessage from "../discord-builders/embed-builder";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {
        if (!interaction.isButton() || interaction['customId'] != 'start' ) return;
        const trainerId = interaction.user.id;
        const trainer = new Trainer(trainerId);
        const memberRole= await interaction.memberPermissions?.has(PermissionsBitField.Flags.SendMessages);

        if (memberRole === true) {
            let trainerPromos = await trainer.getTrainerPromos();
            let promoList: { id: any; name: any; }[] = []
            trainerPromos.forEach((promo: { id: any; roles: { role_name: any; }; }) => {
                promoList.push({
                    "id": promo.id,
                    "name": promo.roles.role_name
                })
            })

            const selectPromosEmbed = new EmbedMessage(
                "Sélection de la promo pour Rappel",
                '#0x0099ff',
                `\n\n Bonjour ${interaction.member?.user.username}, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer dans la liste de sélection ci-dessous.`,
                "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
            );

            const selectPromoRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select_promo')
                    .setPlaceholder('Aucune promotion n\'est actuellement selectionnée')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(promoList.map((promo) => {
                            return {
                                label: `[${promo.name}]`,
                                description: `Envoyer un rappel aux apprenants de ${promo.name
                                }`,
                                value: `${promo.id}`,
                            };
                        })
                    ))
            await interaction.reply({
                embeds: [selectPromosEmbed],
                components: [selectPromoRow],
                ephemeral: true,
            });
        }
    }
}