import { ButtonInteraction, Events } from "discord.js";

export default {
    name : Events.InteractionCreate,
    on: true,
    execute(interaction: ButtonInteraction) {
        if(!interaction.isButton() || interaction.customId != 'reject-id-req') return;
    }
}