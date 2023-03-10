import { ButtonBuilder, ButtonStyle, CommandInteraction, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { ProcedureManager } from "../../utils/procedures/ProcedureManager";
import { getUserRolesByInteraction } from "../../utils/user";

export default {

  data: new ButtonBuilder()
  .setCustomId('test-be')
  .setStyle(ButtonStyle.Success)
  .setLabel("Je suis un test qui doit imperativement réussir"),
  async execute(interaction: StringSelectMenuInteraction) {
    const linked_procedure = await ((interaction.client as any).procedureManager as ProcedureManager).get_procedure("test-procedure");
    const first_interaction : CommandInteraction = await (linked_procedure.get_interaction(0)) as CommandInteraction;
    first_interaction.deleteReply();
  }
}