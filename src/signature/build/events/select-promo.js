"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const trainer_1 = require("../users/trainer");
const embed_builder_1 = __importDefault(require("../discord-builders/embed-builder"));
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    on: true,
    async execute(interaction) {
        if (!interaction.isButton() || interaction['customId'] != 'start')
            return;
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
            const selectPromosEmbed = new embed_builder_1.default("Sélection de la promo pour Rappel", '#0x0099ff', `\n\n Bonjour ${interaction.member?.user.username}, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer dans la liste de sélection ci-dessous.`, "https://cdn-icons-png.flaticon.com/512/4489/4489772.png");
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
};
