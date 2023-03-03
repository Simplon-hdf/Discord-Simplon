"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onInteraction = void 0;
const discord_js_1 = require("discord.js");
const trainer_1 = require("./users/trainer");
const onInteraction = async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'active') {
            const beginProcedure = new discord_js_1.EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Commencer la procédure de rappel de signature")
                .setDescription(`\n\n Bonjour ${interaction.member?.user.username}, \n\n pour commencer la procédure de rappel de signature veuillez cliquer sur le bouton ci-dessous.`)
                .setThumbnail("https://cdn-icons-png.flaticon.com/512/4489/4489772.png");
            const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId("start")
                .setLabel("Commencer la procédure !")
                .setStyle(discord_js_1.ButtonStyle.Success));
            await interaction.reply({ embeds: [beginProcedure], components: [row] });
        }
    }
    if (interaction.isButton()) {
        const trainerId = interaction.user.id;
        const trainer = new trainer_1.Trainer(trainerId);
        const memberRole = await interaction.memberPermissions?.has(discord_js_1.PermissionsBitField.Flags.SendMessages);
        if (memberRole === true) {
            let trainerPromos = await trainer.getTrainerPromos();
            let promoList = [];
            trainerPromos.forEach((promo) => {
                promoList.push({
                    "id": promo.id,
                    "name": promo.roles.role_name
                });
            });
            const selectPromosEmbed = new discord_js_1.EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Sélection de la promo pour Rappel")
                .setDescription(`\n\n Bonjour ${interaction.member?.user.username}, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer dans la liste de sélection ci-dessous.`)
                .setThumbnail("https://cdn-icons-png.flaticon.com/512/4489/4489772.png");
            const selectPromoRow = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.StringSelectMenuBuilder()
                .setCustomId('select_promo')
                .setPlaceholder('Aucune promotion n\'est actuellement selectionnée')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(promoList.map((promo) => {
                return {
                    label: `[${promo.name}]`,
                    description: `Envoyer un rappel aux apprenants de ${promo.name}`,
                    value: `${promo.id}`,
                };
            })));
            await interaction.reply({
                embeds: [selectPromosEmbed],
                components: [selectPromoRow],
                ephemeral: true,
            });
        }
    }
    if (interaction.isAnySelectMenu()) {
        if (interaction.customId === 'select_promo') {
            let selectedPromoId = interaction.values;
            console.log(selectedPromoId);
        }
        /*let promoUuid = interaction.
            let promo = new Promo();*/
        /*const embedReminder = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Sélection des apprenants pour Rappel")
            .setDescription(
                `\n\n Bonjour, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer dans la liste de sélection ci-dessous.`
            )
            .setThumbnail(
                "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
            );

        const selectLearnersRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("select_learners")
                .setPlaceholder("Aucune réponse n'est actuellement sélectionnée !")
                .setMinValues(1)
                //.setMaxValues(learner_list.length)
                .addOptions(
                    {label: 'Option 1', value: 'option_1'},
                    {label: 'Option 2', value: 'option_2'},
                    {label: 'Option 3', value: 'option_3'}*/
        /*learner_list.map((learner) => {
            return {
                label: `[${learner.firstname} ${learner.lastname}]`,
                description: `Formation: ${
                    interaction.guild.roles.cache.get(learner.roles).name
                }`,
                value: `${learner.discord_id}, ${learner.firstname}, ${
                    learner.lastname
                }, ${
                    interaction.guild.roles.cache.get(learner.roles).name
                }, ${interaction.member.displayName}`,
            };
        })
)*/
        /* await interaction.reply({
             embeds: [embedReminder],
             components: [selectLearnersRow],
             ephemeral: true,
         });*/
    }
};
exports.onInteraction = onInteraction;
