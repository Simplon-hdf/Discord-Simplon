import { GuildMember } from 'discord.js';
import { Procedure } from './procedure';

export class ProcedureManager {
  private _procedures: Map<string, Procedure> = new Map<string, Procedure>();

  async register_procedure(procedure: Procedure) {
    this._procedures.set(await procedure.get_name(), procedure);
  }

  async delete_procedure(procedure_name: string) {
    this._procedures.delete(procedure_name);
  }

  // Getters

  async get_procedures(): Promise<Map<string, Procedure>> {
    return this._procedures;
  }

  async get_procedure(procedure_name: string): Promise<Procedure> {
    return this._procedures.get(procedure_name)!;
  }

  async get_procedure_by_user(
    procedure_user: GuildMember,
  ): Promise<Procedure | null> {
    for (const procedure in this._procedures) {
      if ((await this._procedures.get(procedure)?.get_user()) == procedure_user)
        return this._procedures.get(procedure) || null;
    }
    return null;
  }
}
