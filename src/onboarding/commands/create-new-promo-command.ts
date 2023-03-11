import { ActionRowBuilder, ButtonBuilder, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { ClientManager } from "../utils/client-manager";
import { SlashCommand } from "./SlashCommand";

export default class CreateNewPromoCommand extends SlashCommand {
    protected data = new SlashCommandBuilder()
        .setName('generate-interface')
        .setDescription('Cette commande permet de créer une interface servant à selectionner les promos visibiles')
        
    async execute(interaction : CommandInteraction) {
      ClientManager.get_client();
      await interaction.reply({ephemeral: true, content:'Oui'});
    }
}