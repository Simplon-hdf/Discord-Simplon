"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const learner_1 = require("../users/learner");
const embed_builder_1 = __importDefault(require("../discord-builders/embed-builder"));
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    on: true,
    async execute(interaction) {
        if (!interaction.isAnySelectMenu() || interaction['customId'] != 'select_trainer')
            return;
        const trainerUuid = interaction.values[0];
        const learner = new learner_1.Learner(interaction.user.id);
        const codeRequest = await learner.codeRequest(trainerUuid);
        const codeRequestEmbed = new embed_builder_1.default("Merci!", '#0x0099ff', `\n\n Merci ${interaction.user.username}! \n \n Votre demande a bien été prise en compte.`, "https://img.icons8.com/ios-filled/100/null/happy--v1.png");
        await interaction.reply({
            embeds: [codeRequestEmbed],
            ephemeral: true,
        });
        if (codeRequest) {
            const trainerCodeRequest = new embed_builder_1.default("Code Request!", '#0x0099ff', `\n \n Bonjour! Vos apprenants réclament le code! `, "https://cdn-icons-png.flaticon.com/512/4896/4896860.png");
            await (await interaction.client.users.fetch(trainerUuid)).send({
                embeds: [trainerCodeRequest],
            });
        }
    }
};
