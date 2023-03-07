import {
  StringSelectMenuBuilder,
  ChannelType
} from "discord.js";
import { Guild } from "../../guild";
import { HttpUtils } from "../../utils/http";
import { Routes } from "../../utils/routes";

const roles = Guild.YamlConfig.get()["ticketRoles"];

const role = roles.map((role: any) => {
  let pole = Object.keys(role)[0];
  let value = role[pole];
  return {
    label: `[${pole}]`,
    description: `Le ticket concernera le pole: ${pole}`,
    value: `${value}`,
  };
});

export default {
  data: new StringSelectMenuBuilder()
    .setCustomId("selectConcernedPole")
    .setPlaceholder("Veuillez sélectionner une réponse")
    .addOptions(role),
  run: async (interaction: any) => {
    try {

      const poleSelected = interaction.values[0];

      // await new HttpUtils().post(Routes.REGISTER_NEW_TICKET,
      // {
      //   user_uuid: interaction.user.id,
      //   role_uuid: poleSelected,
      //   ticket_tag: "TEST HACEMI",
      //   ticket_state: "IDLE",
      // });


      const thread = await interaction.channel.threads.create({
        name: `[${poleSelected}] - ${interaction.user.username}`,
        type: ChannelType.PrivateThread,
        reason: "test",
      });
      await thread.members.add(interaction.user.id);

    await interaction.reply({
      content: "test",
      ephemeral: true
    })
    } catch (error) {
      interaction.reply(
        `[ERROR] [SELECT_MENU] => Select menu with customId: ${interaction.customId} occured and error`
      );
      console.error(error);
    }
  },
};
