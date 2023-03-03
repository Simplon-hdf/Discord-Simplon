import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    GuildMember,
    Interaction, PermissionsBitField,
    StringSelectMenuBuilder
} from "discord.js";
import {ButtonBuilderClass} from "./discord-builders/button-builder";
import {EmbedBuilderClass} from "./discord-builders/embed-builder";
import {Promo} from "./promo/promo";
import {Trainer} from "./users/trainer";
import {Guild} from "./guild";


export const onInteraction = async (interaction: Interaction) => {

    if (interaction.isCommand()) {

        if (interaction.commandName === 'active') {

            const beginProcedure = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Commencer la procédure de rappel de signature")
                .setDescription(
                    `\n\n Bonjour ${interaction.member?.user.username}, \n\n pour commencer la procédure de rappel de signature veuillez cliquer sur le bouton ci-dessous.`
                )
                .setThumbnail(
                    "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
                );

            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId("start")
                    .setLabel("Commencer la procédure !")
                    .setStyle(ButtonStyle.Success)
            );

            await interaction.reply({embeds: [beginProcedure], components: [row]});

        }

    } if (interaction.isButton()){
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

                const selectPromosEmbed = new EmbedBuilder()
                    .setColor(0x0099ff)
                    .setTitle("Sélection de la promo pour Rappel")
                    .setDescription(
                        `\n\n Bonjour ${interaction.member?.user.username}, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer dans la liste de sélection ci-dessous.`
                    )
                    .setThumbnail(
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

    } if (interaction.isAnySelectMenu()) {
        if (interaction.customId === 'select_promo') {
            let selectedPromo = new Promo(interaction.values[0]);
            let learnerList = await selectedPromo.getLearners();

            const embedReminder = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Sélection des apprenants pour Rappel")
                .setDescription(
                    `\n\n Veuillez sélectionner les apprenants à qui envoyer un rappel dans la liste ci-dessous.`
                )
                .setThumbnail(
                    "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
                );

            const selectLearnersRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("select_learners")
                    .setPlaceholder("Aucune réponse n'est actuellement sélectionnée !")
                    .setMinValues(1)
                    .setMaxValues(learnerList.length)
                    .addOptions(learnerList.map((learner: any )=> {
                        return {
                            label: `[${learner.username}]`,
                            description: `Envoyer un rappel à ${learner.username}`,
                            value: `${learner.id}`,
                        };
                    })
            ))
            await interaction.reply({
                embeds: [embedReminder],
                components: [selectLearnersRow],
                ephemeral: true,
            });
        } if (interaction.customId === "select_learners") {

        }


    }

};