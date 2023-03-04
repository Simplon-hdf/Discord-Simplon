import { Events, Interaction } from "discord.js";
import client from "../..";

const interactionCommand = client.on(
  Events.InteractionCreate,
  async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const parsedClient: any = client;
    const command = parsedClient.commands.get(interaction["commandName"]);
    command.run(interaction);
  }
);

export default interactionCommand;
