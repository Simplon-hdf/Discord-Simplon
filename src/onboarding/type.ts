import { AutocompleteInteraction, Collection, CommandInteraction, Message, PermissionResolvable, SlashCommandBuilder } from "discord.js";

export interface SlashCommand {
    command: SlashCommandBuilder | any,
    execute: (interaction : CommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    cooldown?: number // in seconds
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        cooldowns: Collection<string, number>
    }
}