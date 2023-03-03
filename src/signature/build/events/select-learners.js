"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const promo_1 = require("../promo/promo");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    on: true,
    async execute(interaction) {
        if (!interaction.isAnySelectMenu() || interaction['customId'] != 'select_promo')
            return;
        let selectedPromo = new promo_1.Promo(interaction.values[0]);
        let learnerList = await selectedPromo.getLearners();
        const embedReminder = new discord_js_1.EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Sélection des apprenants pour Rappel")
            .setDescription(`\n\n Veuillez sélectionner les apprenants à qui envoyer un rappel dans la liste ci-dessous.`)
            .setThumbnail("https://cdn-icons-png.flaticon.com/512/4489/4489772.png");
        const selectLearnersRow = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("select_learners")
            .setPlaceholder("Aucune réponse n'est actuellement sélectionnée !")
            .setMinValues(1)
            .setMaxValues(learnerList.length)
            .addOptions(learnerList.map((learner) => {
            return {
                label: `[${learner.username}]`,
                description: `Envoyer un rappel à ${learner.username}`,
                value: `${learner.user_uuid}`,
            };
        })));
        await interaction.reply({
            embeds: [embedReminder],
            components: [selectLearnersRow],
            ephemeral: true,
        });
    }
};
