"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const embed_builder_1 = __importDefault(require("../discord-builders/embed-builder"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('active')
        .setDescription('Run this commands to activate the bot'),
    async execute(interaction) {
        const beginProcedure = new embed_builder_1.default("Commencer la procédure de rappel de signature", "#0x0099ff", `\n\n Bonjour ${interaction.member?.user.username}, \n\n pour commencer la procédure de rappel de signature veuillez cliquer sur le bouton ci-dessous.`, "https://cdn-icons-png.flaticon.com/512/4489/4489772.png");
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId("trainer")
            .setLabel("Rappeler un apprenant")
            .setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
            .setCustomId('learner')
            .setLabel("Demander le code")
            .setStyle(discord_js_1.ButtonStyle.Danger));
        await interaction.reply({ embeds: [beginProcedure], components: [row] });
    },
};
