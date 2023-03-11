import { ActionRowBuilder, ButtonBuilder, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import TestButton from "../components/buttons/test_button";
import test_button from "../components/buttons/test_button";
import { Procedure } from "../utils/procedures/procedure";
import { ProcedureManager } from "../utils/procedures/ProcedureManager";
import { UtilsManager } from "../utils/UtilsManager";
import { SlashCommand } from "./SlashCommand";

export default class CreateNewPromoCommand extends SlashCommand {
    protected data = new SlashCommandBuilder()
        .setName('generate-interface')
        .setDescription('Cette commande permet de créer une interface servant à selectionner les promos visibiles')
        
    async execute(interaction : CommandInteraction) {
      UtilsManager.get_client();
      await interaction.reply({ephemeral: true, content:'Oui', components: [new ActionRowBuilder<ButtonBuilder>().addComponents(...[new TestButton().get_component() as ButtonBuilder])]});
    }
}