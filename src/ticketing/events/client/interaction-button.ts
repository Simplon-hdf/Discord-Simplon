import { Events, Interaction } from "discord.js";
import client from "../../index.js";

const interactionButton = client.on(
  Events.InteractionCreate,
  (interaction: Interaction) => {
    if (!interaction.isButton() || !interaction.inCachedGuild()) return;

    const button = client.buttons.get(interaction.customId);

    if (!button) {
      interaction.reply("[ERROR] [INTERACTION_BUTTON] => No button provided.");
      return;
    } else { 
      button.run(interaction);

      console.log(
        `[BUTTON] ${interaction.guild.name}(${interaction.guild.id}) - ${interaction.user.tag}(${interaction.user.id}) executed ${button.data.data.label}.`
      );
    }
  }
); 

export default interactionButton;
