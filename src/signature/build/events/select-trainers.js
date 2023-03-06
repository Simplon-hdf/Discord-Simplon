"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const learner_1 = require("../users/learner");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    on: true,
    async execute(interaction) {
        if (!interaction.isButton() || interaction['customId'] != 'start')
            return;
        const learner = new learner_1.Learner(interaction.user.id);
        const interactionChannel = interaction.channel?.id;
        const memberRole = interaction.guild?.members.me?.permissionsIn(interactionChannel).has(discord_js_1.PermissionsBitField.Flags.SendMessages);
        if (!memberRole) {
            const codeRequestStatus = await learner.getCodeRequestStatus();
            if (codeRequestStatus) {
                console.log('hello');
            }
        }
    }
};
