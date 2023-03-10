import { CommandInteraction, GuildMember, Interaction, InteractionType } from "discord.js";

export class Procedure {

  private _user: GuildMember;
  private _interactions: Map<Number, Interaction> = new Map<Number, Interaction>();

  constructor(user: GuildMember, interaction: Interaction) {
    this._user = user;
    this._interactions.set(0, interaction);
  }

  async register_step(new_interaction: Interaction) {
    this._interactions.set(this._interactions.keys.length, new_interaction);
  }

  async get_interaction(id: Number): Promise<Interaction | null> {
    return this._interactions.get(id) || null;
  }

  async get_user() : Promise<GuildMember> {
    return this._user;
  }

}