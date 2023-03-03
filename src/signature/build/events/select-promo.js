"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const trainer_1 = require("../users/trainer");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    on: true,
    async execute(interaction) {
        if (!interaction.isButton() || interaction['customId'] != 'start')
            return;
        const trainerId = interaction.user.id;
        const trainer = new trainer_1.Trainer(trainerId);
        const memberRole = await interaction.memberPermissions?.has(discord_js_1.PermissionsBitField.Flags.SendMessages);
        if (memberRole === true) {
            let trainerPromos = await trainer.getTrainerPromos();
            let promoList = [];
            trainerPromos.forEach((promo) => {
                promoList.push({
                    "id": promo.id,
                    "name": promo.roles.role_name
                });
            });
            const selectPromosEmbed = new discord_js_1.EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Sélection de la promo pour Rappel")
                .setDescription(`\n\n Bonjour ${interaction.member?.user.username}, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer dans la liste de sélection ci-dessous.`)
                .setThumbnail("https://cdn-icons-png.flaticon.com/512/4489/4489772.png");
            const selectPromoRow = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.StringSelectMenuBuilder()
                .setCustomId('select_promo')
                .setPlaceholder('Aucune promotion n\'est actuellement selectionnée')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(promoList.map((promo) => {
                return {
                    label: `[${promo.name}]`,
                    description: `Envoyer un rappel aux apprenants de ${promo.name}`,
                    value: `${promo.id}`,
                };
            })));
            await interaction.reply({
                embeds: [selectPromosEmbed],
                components: [selectPromoRow],
                ephemeral: true,
            });
        }
    }
};
