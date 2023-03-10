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
        if (!interaction.isButton() || interaction['customId'] !== 'deactivate')
            return;
        const selectedPromoId = interaction.message.content;
        const trainer = new trainer_1.Trainer(interaction.user.id);
        const deactivate = await trainer.deactivateCodeRequest(selectedPromoId);
        if (deactivate) {
            const confirmationEmbed = new embed_builder_1.default("Merci !", "#0x0099ff", `Bonjour ${interaction.user.username}, vos apprenants ne peuvent plus utiliser leur fonction de rappel pour la demi-journée`, "https://cdn-icons-png.flaticon.com/512/4896/4896860.png");
            await interaction.reply({
                embeds: [confirmationEmbed],
                ephemeral: true
            });
            setTimeout(() => interaction.deleteReply(), 30000);
        }
    }
};
