import { ButtonInteraction, Events } from "discord.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {
        if (!interaction.isModalSubmit() || interaction['customId'] != 'reject-id-req') return;
            
    }
}