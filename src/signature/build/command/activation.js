"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('active')
        .setDescription('Run this commands to activate the bot'),
    async execute(interaction) {
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
    },
};
