import { Events, Interaction } from "discord.js";
import client from "../../index.js";

const interactionModal = client.on(
  Events.InteractionCreate,
  (interaction: Interaction) => {
    if (!interaction.isStringSelectMenu() || !interaction.inCachedGuild()) return;

    const selectMenu = client.selectmenu.get(interaction.customId);

    if (!selectMenu) {
      interaction.reply("[ERROR] [INTERACTION_SELECT_MENU] => No select menu provided.");
      return;
    } else {
        selectMenu.run(interaction);
      console.log(
        `[MODAL] ${interaction.guild.name}(${interaction.guild.id}) - ${interaction.user.tag}(${interaction.user.id}) send modal ${selectMenu.data.data.title}`
      );
    }
  }
);

export default interactionModal;
