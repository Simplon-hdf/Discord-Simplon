import { ActionRowBuilder, ButtonBuilder, CommandInteraction, SlashCommandBuilder, StringSelectMenuBuilder } from "discord.js";
import { HttpUtils } from "../utils/http";
import { Routes } from "../utils/Routes";
import manageViewPromoMenu from "../components/select_menu/manage-view-promo";

export default {
    data: new SlashCommandBuilder()
        .setName('generate-interface-displprom')
        .setDescription('Cette commande permet de créer une interface servant à selectionner les promos visibiles'),
    async execute(interaction : CommandInteraction) {
      const ongoing_promos: any[] = (await new HttpUtils().get(Routes.GET_ONGOING_PROMOS_BY_GUILD_UUID, interaction.guildId as string));
      const guild_roles: any[] = (await new HttpUtils().get(Routes.GET_ROLES_BY_GUILD_UUID, interaction.guildId as string));
      const guild_courses: any[] = (await new HttpUtils().get(Routes.GET_COURSES_BY_GUILD_UUID, interaction.guildId as string))['data'];
      const components : ActionRowBuilder<StringSelectMenuBuilder>[] = [];
      for (const course of guild_courses) {
        const associated_promos: any[] = [...ongoing_promos.filter(promo => promo['id_courses'] == course['id'])];
        const associated_roles: any[] = [];
        for (const associated_promo of associated_promos) {
          associated_roles.push(...guild_roles.filter(role => role['id'] == associated_promo['id_roles']));
        }
        const select_menu = manageViewPromoMenu;
        select_menu.build(course['course_name'], associated_roles);
        if (select_menu.data.options.length == 0)
          break;
        const parsedClient: any = interaction.client;
        parsedClient.components.set(select_menu.data.data.custom_id, select_menu);
        components.push(new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select_menu.data));
      }
      await interaction.reply({content: 'Menu de selection des promos : ', components: components});
    },
}