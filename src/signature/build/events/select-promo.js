"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const trainer_1 = require("../users/trainer");
const embed_builder_1 = __importDefault(require("../discord-builders/embed-builder"));
const select_menu_builder_1 = require("../discord-builders/select-menu-builder");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    on: true,
    async execute(interaction) {
        if (!interaction.isButton() || interaction['customId'] !== 'trainer')
            return;
        const trainer = new trainer_1.Trainer(interaction.user.id);
        const trainerRole = await interaction.memberPermissions?.has(discord_js_1.PermissionsBitField.Flags.CreatePrivateThreads);
        if (trainerRole) {
            let trainerPromos = await trainer.getTrainerPromos();
            let promoList = [];
            trainerPromos.forEach((promo) => {
                promoList.push({
                    "id": promo.id,
                    "name": promo.roles.role_name
                });
            });
            const selectPromosEmbed = new embed_builder_1.default("Sélection de la promo pour Rappel", '#0x0099ff', `\n\n Bonjour ${interaction.member?.user.username}, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer dans la liste de sélection ci-dessous.`, "https://cdn-icons-png.flaticon.com/512/4489/4489772.png");
            let options = promoList.map((promo) => {
                return {
                    label: `[${promo.name}]`,
                    description: `Envoyer un rappel aux apprenants de ${promo.name}`,
                    value: `${promo.id}`,
                };
            });
            const selectPromoRow = new discord_js_1.ActionRowBuilder().addComponents(new select_menu_builder_1.SelectMenu('select_promo', 'Aucune promotion n\'est actuellement selectionnée', options, 1, 1));
            await interaction.reply({
                embeds: [selectPromosEmbed],
                components: [selectPromoRow],
                ephemeral: true,
            });
        }
    }
};
