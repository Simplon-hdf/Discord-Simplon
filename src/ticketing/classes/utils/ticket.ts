export class Ticket {
  private readonly _userUuid: string;
  private _roleUuid?: string;
  private readonly _ticketTag: string;
  private readonly _ticketState: string;

  constructor(
    userUuid: string,
    ticketTag: string,
    ticketState: string,
    roleUuid?: string
  ) {
    this._userUuid = userUuid;
    this._roleUuid = roleUuid;
    this._ticketTag = ticketTag;
    this._ticketState = ticketState;
  }

  get ticketState(): string {
    return this._ticketState;
  }

  get ticketTag(): string {
    return this._ticketTag;
  }

  getRoleUuid(): string | undefined {
    return this._roleUuid;
  }

  get userUuid(): string {
    return this._userUuid;
  }

  set roleUuid(uuid: string) {
    this._roleUuid = uuid;
  }
}
