import {
    Events,
    PermissionsBitField,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonInteraction,
} from "discord.js";
import {Trainer} from "../users/trainer";
import EmbedMessage from "../discord-builders/embed-builder";
import {SelectMenu} from "../discord-builders/select-menu-builder";

import {Learner} from "../users/learner";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {
        const trainerRole= await interaction.memberPermissions?.has(PermissionsBitField.Flags.CreatePrivateThreads);
        if (trainerRole) {
         if (!interaction.isButton() || interaction['customId'] !== 'activation' ) return;
            const trainer = new Trainer(interaction.user.id);
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
            setTimeout(() => interaction.deleteReply(), 60000);
        } else {
            if (!interaction.isButton() || interaction['customId'] !== 'activation') return;
            const learner = new Learner(interaction.user.id)
            const codeRequestStatus = await learner.getCodeRequestStatus()
            if (codeRequestStatus) {
                const hasReport = await learner.hasReport();
                if (!hasReport) {
                    const trainerList = await learner.getTrainers()
                    const selectTrainer = new EmbedMessage(
                        "Sélection du formateur pour rappel",
                        '#0x0099ff',
                        `\n\n Veuillez sélectionner le formateur à qui envoyer un rappel dans la liste ci-dessous.`,
                        "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
                    )
                    const selectTrainerRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("select_trainer")
                            .setPlaceholder("Aucune réponse n'est actuellement sélectionnée !")
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions(trainerList.map((trainer: any) => {
                                    return {
                                        label: `[${trainer.username}]`,
                                        description: `Envoyer un rappel à ${trainer.username}`,
                                        value: `${trainer.user_uuid}`,
                                    };
                                })
                            ))
                    await interaction.reply({
                        embeds: [selectTrainer],
                        components: [selectTrainerRow],
                        ephemeral: true,
                    });
                    setTimeout(() => interaction.deleteReply(), 60000);
                } else {
                    const everReport = new EmbedMessage(
                        'Code déjà demandé!',
                        '#0x0099ff',
                        'Oups! Il semble que vous ayez déjà demandé le code cette demi-journée, un conseil, parlez-en à vos collègues!',
                        'https://img.icons8.com/ios-filled/100/null/sad.png'
                    )
                    await interaction.reply({embeds: [everReport], ephemeral: true})
                    setTimeout(() => interaction.deleteReply(), 60000);
                }
            } else {
                const isNotActivate = new EmbedMessage(
                    'Demande de code indisponible !',
                    '#0x0099ff',
                    `Désolé ${interaction.user.username}, il semble que le code vous ai déjà été donné!`,
                    "https://img.icons8.com/ios-filled/100/null/sad.png"
                )
                await interaction.reply({ embeds: [isNotActivate], ephemeral: true });
                setTimeout(() => interaction.deleteReply(), 60000);
            }
        }
    }
}
