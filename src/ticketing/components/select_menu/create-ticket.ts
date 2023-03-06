import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { HttpUtils } from "../../utils/http";
import { Routes } from "../../utils/routes";

export default {
  data: new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("select")
      .setPlaceholder("Nothing selected")
      .addOptions(
        {
          label: "Select me",
          description: "This is a description",
          value: "first_option",
        },
        {
          label: "You can select me too",
          description: "This is also a description",
          value: "second_option",
        }
      )
  ),
  run: async (interaction: StringSelectMenuInteraction) => {

    await interaction.reply("coucou");
  },
};
