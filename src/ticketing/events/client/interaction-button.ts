import { BaseInteraction, Events, Interaction } from "discord.js";
import chalk from "chalk";
import client from "../../index.js"

const interactionButton = client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isButton() || !interaction.inCachedGuild()) return;

  const button = client.buttons.get(interaction.customId);


  if (!button) {
    return;
  } else {
    button.run(interaction);
    console.log(chalk.white(`[BUTTON] ${interaction.guild.name}(${interaction.guild.id}) - ${interaction.user.tag}(${interaction.user.id}) executed ${button.data.data.label}`))
  }
});

export default interactionButton;