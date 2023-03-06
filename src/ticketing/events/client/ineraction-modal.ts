import { Events, Interaction } from "discord.js";
import client from "../../index.js";

const interactionModal = client.on(
  Events.InteractionCreate,
  (interaction: Interaction) => {
    if (!interaction.isModalSubmit() || !interaction.inCachedGuild()) return;

    const modal = client.modals.get(interaction.customId);

    if (!modal) {
      interaction.reply("[ERROR] [INTERACTION_MODAL] => No modal provided.");
      return;
    } else {
      modal.run(interaction);
      console.log(
        `[MODAL] ${interaction.guild.name}(${interaction.guild.id}) - ${interaction.user.tag}(${interaction.user.id}) send modal ${modal.data.data.title}`
      );
    }
  }
);

export default interactionModal;
