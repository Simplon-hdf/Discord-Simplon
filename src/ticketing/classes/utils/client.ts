import { Ticket } from "./ticket";

export class DiscordClient {
  private static instance?: DiscordClient;
  private ticket?: Ticket;

  constructor() {}

  static getInstance(): DiscordClient {
    if (!DiscordClient.instance) {
        DiscordClient.instance = new DiscordClient();
      }
      return DiscordClient.instance;
  }

  getTicket() {
    return this.ticket;
  }

  setTicket(ticket: Ticket) {
    this.ticket = ticket;
  }

  destroy(): void {
    DiscordClient.instance = undefined;
  }
}
