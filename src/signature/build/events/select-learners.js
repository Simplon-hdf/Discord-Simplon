"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const promo_1 = require("../promo/promo");
const embed_builder_1 = __importDefault(require("../discord-builders/embed-builder"));
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    on: true,
    async execute(interaction) {
        if (!interaction.isAnySelectMenu() || interaction['customId'] !== 'select_promo')
            return;
        let selectedPromo = new promo_1.Promo(interaction.values[0]);
        let learnerList = await selectedPromo.getLearners();
        const embedReminder = new embed_builder_1.default("Sélection des apprenants pour Rappel", '#0x0099ff', `\n\n Veuillez sélectionner les apprenants à qui envoyer un rappel dans la liste ci-dessous.`, "https://cdn-icons-png.flaticon.com/512/4489/4489772.png");
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
