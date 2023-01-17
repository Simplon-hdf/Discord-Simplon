import { ButtonInteraction, Events } from "discord.js"

export default {
    name: Events.InteractionCreate,
    once: true,
    async execute(interaction : ButtonInteraction) {
        if(!interaction.isButton()) return;

        console.log(interaction);

    }
}