import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export abstract class SlashCommand {
  
  abstract data: any;

  abstract execute(interaction: CommandInteraction): void;

  public get_data(): SlashCommandBuilder {
    return this.data;
  }
}