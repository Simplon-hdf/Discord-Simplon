"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const trainer_1 = require("../users/trainer");
const embed_builder_1 = __importDefault(require("../discord-builders/embed-builder"));
const select_menu_builder_1 = require("../discord-builders/select-menu-builder");
const learner_1 = require("../users/learner");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    on: true,
    async execute(interaction) {
        const trainerRole = await interaction.memberPermissions?.has(discord_js_1.PermissionsBitField.Flags.CreatePrivateThreads);
        if (trainerRole) {
            if (!interaction.isButton() || interaction['customId'] !== 'activation')
                return;
            const trainer = new trainer_1.Trainer(interaction.user.id);
            let trainerPromos = await trainer.getTrainerPromos();
            let promoList = [];
            trainerPromos.forEach((promo) => {
                promoList.push({
                    "id": promo.id,
                    "name": promo.roles.role_name
                });
            });
            const selectPromosEmbed = new embed_builder_1.default("Sélection de la promo pour Rappel", '#0x0099ff', `\n\n Bonjour ${interaction.member?.user.username}, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer dans la liste de sélection ci-dessous.`, "https://cdn-icons-png.flaticon.com/512/4489/4489772.png");
            let options = promoList.map((promo) => {
                return {
                    label: `[${promo.name}]`,
                    description: `Envoyer un rappel aux apprenants de ${promo.name}`,
                    value: `${promo.id}`,
                };
            });
            const selectPromoRow = new discord_js_1.ActionRowBuilder().addComponents(new select_menu_builder_1.SelectMenu('select_promo', 'Aucune promotion n\'est actuellement selectionnée', options, 1, 1));
            await interaction.reply({
                embeds: [selectPromosEmbed],
                components: [selectPromoRow],
                ephemeral: true,
            });
        }
        else {
            if (!interaction.isButton() || interaction['customId'] !== 'activation')
                return;
            const learner = new learner_1.Learner(interaction.user.id);
            const codeRequestStatus = await learner.getCodeRequestStatus();
            console.log(codeRequestStatus);
            if (codeRequestStatus) {
                const hasReport = await learner.hasReport();
                if (!hasReport) {
                    const trainerList = await learner.getTrainers();
                    const selectTrainer = new embed_builder_1.default("Sélection du formateur pour rappel", '#0x0099ff', `\n\n Veuillez sélectionner le formateur à qui envoyer un rappel dans la liste ci-dessous.`, "https://cdn-icons-png.flaticon.com/512/4489/4489772.png");
                    const selectTrainerRow = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.StringSelectMenuBuilder()
                        .setCustomId("select_trainer")
                        .setPlaceholder("Aucune réponse n'est actuellement sélectionnée !")
                        .setMinValues(1)
                        .setMaxValues(1)
                        .addOptions(trainerList.map((trainer) => {
                        return {
                            label: `[${trainer.username}]`,
                            description: `Envoyer un rappel à ${trainer.username}`,
                            value: `${trainer.user_uuid}`,
                        };
                    })));
                    await interaction.reply({
                        embeds: [selectTrainer],
                        components: [selectTrainerRow],
                        ephemeral: true,
                    });
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
