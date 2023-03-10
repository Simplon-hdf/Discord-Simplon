import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { ProcedureManager } from "../../utils/procedures/ProcedureManager";
import { getUserRolesByInteraction } from "../../utils/user";
import test_buttontwo from "../buttons/test_button2";

export default {

  data: new ButtonBuilder()
  .setCustomId('test-b')
  .setStyle(ButtonStyle.Success)
  .setLabel("Je suis un test qui doit imperativement réussir"),
  async execute(interaction: StringSelectMenuInteraction) {
    await interaction.reply({components: [new ActionRowBuilder<ButtonBuilder>().addComponents(test_buttontwo.data)]});
  }
}