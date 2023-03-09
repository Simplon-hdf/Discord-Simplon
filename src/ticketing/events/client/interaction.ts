import { Events, Interaction } from "discord.js";
import client from "../../index.js";

const interaction = client.on(
  Events.InteractionCreate,
  (interaction: Interaction) => {
    const parsedClient: any = client;
    if (interaction.isChatInputCommand()) {
      parsedClient.commands
        .get(interaction.commandName)
        .run(interaction);
    } else {
      const castedInteraction: any = interaction;
      parsedClient.components
        .get(castedInteraction["customId"])
        .run(interaction);
    }
  }
);

export default interaction;
