import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "./SlashCommand";

export default class TestCommand extends SlashCommand {

  data = new SlashCommandBuilder()
      .setName("salut")
      .setDescription("test")

  async execute(interaction: CommandInteraction) {
    console.log(interaction);
    await interaction.reply("Bonjour");
  }

  auto_build() {
    return new TestCommand();
  }

}