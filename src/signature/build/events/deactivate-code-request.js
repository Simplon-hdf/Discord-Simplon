"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const trainer_1 = require("../users/trainer");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    on: true,
    async execute(interaction) {
        if (!interaction.isButton() || interaction['customId'] !== 'deactivate_code_request')
            return;
        const trainer = new trainer_1.Trainer(interaction.user.id);
        const trainerRole = await interaction.memberPermissions?.has(discord_js_1.PermissionsBitField.Flags.CreatePrivateThreads);
        if (trainerRole) {
            console.log('ok');
        }
    }
};
