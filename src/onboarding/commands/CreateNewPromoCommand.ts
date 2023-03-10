import { ActionRowBuilder, ButtonBuilder, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
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
      
      const procedure = new Procedure(interaction.guild?.members.resolve(interaction.user.id)!, (interaction as Interaction));
      ((interaction.client as any).procedureManager as ProcedureManager).register_procedure("test-procedure", procedure);
      await interaction.reply({ephemeral: true, content:'Oui', components: [new ActionRowBuilder<ButtonBuilder>().addComponents(test_button.data)]});
    }
}