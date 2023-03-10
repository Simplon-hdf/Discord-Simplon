import { Guild, GuildMember } from "discord.js";
import { Procedure } from "./procedure";

export class ProcedureManager {

  private _procedures: Map<String, Procedure>;

  constructor() {
    this._procedures = new Map<String, Procedure>;
  }

  async register_procedure(procedure_name: string, procedure: Procedure) {
    this._procedures.set(procedure_name, procedure);
  }

  async get_procedures(): Promise<Map<String, Procedure>> {
    return this._procedures;
  }

  async get_procedure(procedure_name: string): Promise<Procedure> {
    return this._procedures.get(procedure_name)!;
  }

  async get_procedure_by_user(procedure_user: GuildMember): Promise<Procedure | null> {
    for (const procedure in this._procedures) {
      if (await this._procedures.get(procedure)?.get_user() == procedure_user)
        return this._procedures.get(procedure) || null;
    }
    return null;
  }
}