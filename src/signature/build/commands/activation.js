"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('active')
        .setDescription('Run this command to activate the bot'),
    async execute(interaction) {
        await interaction.reply('Hello');
    },
};
