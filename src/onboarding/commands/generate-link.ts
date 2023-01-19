import { ActionRowBuilder, RoleSelectMenuBuilder, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('generate-link')
        .setDescription('Cette commande permet d\'afficher une Pop-up permettant de créer un lien d\'invitation'),
    async execute(interaction) {
        const row = new ActionRowBuilder<RoleSelectMenuBuilder>()
            .addComponents(
                new RoleSelectMenuBuilder() 
                    .setCustomId('selected-role')
                    .setPlaceholder('Selectionnez un rôle')
                    .setMinValues(1)
                    .setMaxValues(1)
            )
        await interaction.reply({content: 'Choissiez un rôle à assigner à l\'invitation', ephemeral: true, components: [row]});
    }
}