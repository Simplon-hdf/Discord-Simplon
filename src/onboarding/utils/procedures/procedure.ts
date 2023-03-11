import { CommandInteraction, GuildMember, Interaction, InteractionType } from "discord.js";

export class Procedure {

  private _name: string;
  private _user: GuildMember;
  private _interactions: Map<Number, Interaction> = new Map<Number, Interaction>();

  constructor(name: string, interaction: Interaction) {
    this._user = interaction.guild?.members.resolve(interaction.user.id)!;
    this._name = name;
    this._interactions.set(0, interaction);
  }

  // Setters

  async register_step(new_interaction: Interaction) {
    this._interactions.set(this._interactions.keys.length, new_interaction);
  }

  async delete_step() {

  }

  // Getters

  async get_interaction(id: Number): Promise<Interaction | null> {
    return this._interactions.get(id) || null;
  }

  async get_user() : Promise<GuildMember> {
    return this._user;
  }

  async get_name(): Promise<String> {
    return this._name;
  }

}