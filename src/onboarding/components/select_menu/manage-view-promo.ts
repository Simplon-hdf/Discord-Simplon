import { APIBaseComponent, ComponentBuilder, ComponentType, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { getUserRolesByInteraction } from "../../utils/user";
import CustomComponent from "../CustomComponent";


export default class ManagePromoViewMenu extends CustomComponent {
  protected customId: string = "";
  protected component: StringSelectMenuBuilder = new StringSelectMenuBuilder();
  protected data: any = {};


  async execute(interaction: StringSelectMenuInteraction) {
    await interaction.reply('temp');
    /*
    const select_menu = this.data.get(interaction.customId);
    const selected_values = interaction.values;
    const user_role_manager = interaction.guild?.members.resolve(interaction.user.id)?.roles;
    for (const option of select_menu?.options!) {
      const option_value: string = option.data.value as string;
      if (selected_values.includes(option_value)) {
        user_role_manager?.add(option_value);
      } else {
        user_role_manager?.remove(option_value);
      }
    }
    await interaction.reply({ ephemeral: true, content: 'Vos rôles ont étés mis à jour' });
    setTimeout(async () => {
      try {
        await interaction.deleteReply();
      } catch { }
    }, 2000);
  }
  async build(course_name: string, associated_roles: any[]) {
    this.data = new StringSelectMenuBuilder();
    this.data.setPlaceholder(course_name);
    this.data.setCustomId(`course-${course_name}`);
    for (const associated_role of associated_roles) {
      this.data.addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(associated_role['role_name'])
          .setValue(associated_role['role_uuid']));
    }
    if (this.data.options.length == 0)
      return;
    this.data.setMinValues(0);
    this.data.setMaxValues(this.data.options.length >= 25 ? 20 : this.data.options.length);
    this.data.set(this.data.data.custom_id!, this.data);
    */
  }
}