import { CommandInteraction, SlashCommandBuilder } from "discord.js";


export default {
    data : new SlashCommandBuilder()
        .setName('config_channel_selector')
        .setDescription('Permet d\afficher l\'interface de on boarding, elle vous permettra de selectionner les channels que vous voulez afficher.'),
    async execute(interaction : CommandInteraction){
        if(!interaction.isChatInputCommand()){
            
        }
    }
}