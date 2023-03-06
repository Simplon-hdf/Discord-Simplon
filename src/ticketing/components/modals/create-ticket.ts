import {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalSubmitInteraction,
} from "discord.js";
import { HttpUtils } from "../../utils/http";
import { Routes } from "../../utils/routes";

export default {
  data: new ModalBuilder()
    .setCustomId("createTicketModal")
    .setTitle("Demande de ticket")
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("userRequest")
          .setLabel("Demande du ticket")
          .setPlaceholder("ex. Problème rémunération.")
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
      )
    ),
  run: async (interaction: ModalSubmitInteraction) => {

    // const userRequest = interaction.fields.getTextInputValue("userRequest");
    // await new HttpUtils().post(Routes.REGISTER_NEW_TICKET, 
    // {
    //   user_uuid: interaction.user.id,
    //   role_uuid: "1043613353672716311",
    //   ticket_tag: userRequest,
    //   ticket_state: "IDLE",
    // });

    await interaction.reply("coucou")

  },
};
