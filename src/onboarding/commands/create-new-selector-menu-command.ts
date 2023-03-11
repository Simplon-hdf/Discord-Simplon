import { ActionRowBuilder, ButtonBuilder, CommandInteraction, Interaction, SlashCommandBuilder, StringSelectMenuBuilder } from "discord.js";
import ManagePromoViewMenu from "../components/select_menu/manage-view-promo";
import { HttpUtils } from "../utils/http";
import { Procedure } from "../utils/procedures/procedure";
import { ProcedureManager } from "../utils/procedures/ProcedureManager";
import { HttpRoutes } from "../utils/routes/http-routes";
import { ClientManager } from "../utils/client-manager";
import { SlashCommand } from "./SlashCommand";

export default class CreatePromoSelectorMenuCommand extends SlashCommand {
  
  protected data = new SlashCommandBuilder()
    .setName('generate-interface-displprom')
    .setDescription('Cette commande permet de créer une interface servant à selectionner les promos visibiles')

  async execute(interaction: CommandInteraction) {
    const ongoing_promos: any[] = (await new HttpUtils().get(HttpRoutes.GET_ONGOING_PROMOS_BY_GUILD_UUID, interaction.guildId as string));
    const guild_roles: any[] = (await new HttpUtils().get(HttpRoutes.GET_ROLES_BY_GUILD_UUID, interaction.guildId as string));
    const guild_courses: any[] = (await new HttpUtils().get(HttpRoutes.GET_COURSES_BY_GUILD_UUID, interaction.guildId as string))['data'];
    const components: ActionRowBuilder<StringSelectMenuBuilder>[] = [];
    
    for (const course of guild_courses) {
      const associated_promos: any[] = [...ongoing_promos.filter(promo => promo['id_courses'] == course['id'])];
      const associated_roles: any[] = [];
      for (const associated_promo of associated_promos) {
        associated_roles.push(...guild_roles.filter(role => role['id'] == associated_promo['id_roles']));
      }
      const select_menu = new ManagePromoViewMenu();
      const select_menu_component : StringSelectMenuBuilder = select_menu.get_component() as StringSelectMenuBuilder;
      select_menu.build(course['course_name'], associated_roles);
      if (select_menu_component.options.length == 0)
        break;
      ClientManager.add_component(select_menu);
      components.push(new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select_menu_component));
    }
    
    await interaction.reply({ content: 'Menu de selection des promos : ', components: components });
  }
}