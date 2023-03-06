import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { HttpUtils } from "../../utils/http";
import { Routes } from "../../utils/routes";

export default {
  data: new StringSelectMenuBuilder()
    .setCustomId("selectConcernedPole")
    .setPlaceholder("Veuillez sélectionner une réponse")
    .addOptions(
      {
        label: "Test",
        description: "This is a test",
        value: "first_option",
      },
      {
        label: "You can select me too",
        description: "This is also a description",
        value: "second_option",
      }
    ),
  run: async (interaction: any) => {
    try {
      // const userRequest = interaction.fields.getTextInputValue("userRequest");
      // await new HttpUtils().post(Routes.REGISTER_NEW_TICKET,
      // {
      //   user_uuid: interaction.user.id,
      //   role_uuid: "1043613353672716311",
      //   ticket_tag: userRequest,
      //   ticket_state: "IDLE",
      // });

      await interaction.reply("coucou");
    } catch (error) {
      interaction.reply(
        `[ERROR] [SELECT_MENU] => Select menu with customId: ${interaction.customId} occured and error`
      );
      console.error(error);
    }
  },
};
