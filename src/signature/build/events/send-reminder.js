"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    on: true,
    async execute(interaction) {
        if (!interaction.isAnySelectMenu() || interaction['customId'] != 'select_learners')
            return;
        for (const learnerUuId of interaction.values) {
            const embedReminderLearner = new discord_js_1.EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Rappel de signature")
                .setDescription(`Bonjour ! \n\n Votre formateur **${interaction.user.username}** vous a envoyé un rappel de signature ! \n\n`)
                .setThumbnail("https://cdn-icons-png.flaticon.com/512/4896/4896860.png")
                .setTimestamp();
            await (await interaction.client.users.fetch(learnerUuId)).send({
                embeds: [embedReminderLearner],
            });
            const embedResponse = new discord_js_1.EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Merci!")
                .setDescription(`Votre demande a bien été prise en compte.`);
            await interaction.reply({
                embeds: [embedResponse],
                ephemeral: true,
            });
        }
    }
};
