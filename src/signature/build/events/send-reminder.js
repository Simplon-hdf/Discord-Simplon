"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const embed_builder_1 = __importDefault(require("../discord-builders/embed-builder"));
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    on: true,
    async execute(interaction) {
        if (!interaction.isAnySelectMenu() || interaction['customId'] !== 'select_learners')
            return;
        for (const learnerUuId of interaction.values) {
            const embedReminderLearner = new embed_builder_1.default("Rappel de signature", '#0x0099ff', `Bonjour ! \n\n Votre formateur **${interaction.user.username}** vous a envoyé un rappel de signature ! \n\n`, "https://cdn-icons-png.flaticon.com/512/4896/4896860.png");
            await (await interaction.client.users.fetch(learnerUuId)).send({
                embeds: [embedReminderLearner],
            });
            const embedResponse = new embed_builder_1.default("Merci!", '#0x0099ff', `Votre demande a bien été prise en compte.`, "https://cdn-icons-png.flaticon.com/512/4896/4896860.png");
            await interaction.reply({
                embeds: [embedResponse],
                ephemeral: true,
            });
            setTimeout(() => interaction.deleteReply(), 30000);
        }
    }
};
