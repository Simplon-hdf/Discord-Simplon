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
        if (!interaction.isButton() || interaction['customId'] != 'start')
            return;
        const learner = new learner_1.Learner(interaction.user.id);
        const interactionChannel = interaction.channel?.id;
        const memberRole = interaction.guild?.members.me?.permissionsIn(interactionChannel).has(discord_js_1.PermissionsBitField.Flags.SendMessages);
        if (!memberRole) {
            const codeRequestStatus = await learner.getCodeRequestStatus();
            if (codeRequestStatus) {
                const hasReport = await learner.hasReport();
                console.log(hasReport);
                if (!hasReport) {
                }
                else {
                    const everReport = new embed_builder_1.default('Code déjà demandé!', '#0x0099ff', 'Oups! Il semble que vous ayez déjà demandé le code cette demi-journée, un conseil, parlez-en à vos collègues!', 'https://img.icons8.com/ios-filled/100/null/sad.png');
                    await interaction.reply({ embeds: [everReport], ephemeral: true });
                }
            }
            else {
                const isNotActivate = new embed_builder_1.default('Demande de code indisponible !', '#0x0099ff', `Désolé ${interaction.user.username}, il semble que le code vous ai déjà été donné!`, "https://img.icons8.com/ios-filled/100/null/sad.png");
                await interaction.reply({ embeds: [isNotActivate], ephemeral: true });
            }
        }
    }
};
