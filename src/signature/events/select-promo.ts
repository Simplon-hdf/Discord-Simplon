import {
    Events,
    PermissionsBitField,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonInteraction
} from "discord.js";
import {Trainer} from "../users/trainer";
import EmbedMessage from "../discord-builders/embed-builder";
import {SelectMenu} from "../discord-builders/select-menu-builder";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {
        if (!interaction.isButton() || interaction['customId'] !== 'trainer' ) return;

        const trainer = new Trainer(interaction.user.id);
        const trainerRole= await interaction.memberPermissions?.has(PermissionsBitField.Flags.CreatePrivateThreads);

        if (trainerRole) {
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

            let options = promoList.map((promo) => {
                return {
                    label: `[${promo.name}]`,
                    description: `Envoyer un rappel aux apprenants de ${promo.name
                    }`,
                    value: `${promo.id}`,
                };
            })
            const selectPromoRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new SelectMenu(
                    'select_promo',
                    'Aucune promotion n\'est actuellement selectionnée',
                    options,
                    1,
                    1
                    ))
            await interaction.reply({
                embeds: [selectPromosEmbed],
                components: [selectPromoRow],
                ephemeral: true,
            });
        }
    }
}
