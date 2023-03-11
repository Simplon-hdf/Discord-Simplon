import { ButtonBuilder, ButtonInteraction, ButtonStyle, ComponentBuilder, StringSelectMenuInteraction } from "discord.js";
import CustomComponent from "../CustomComponent";

export default class TestButton extends CustomComponent {

  protected data: any;
  protected customId: string = "test-button";
  protected component: ComponentBuilder = new ButtonBuilder()
    .setCustomId(this.customId)
    .setStyle(ButtonStyle.Success)
    .setLabel("Bonjour toi")

  async execute(interaction: ButtonInteraction) {
    console.log("Oui");
    await interaction.reply('Oui');
  }
}