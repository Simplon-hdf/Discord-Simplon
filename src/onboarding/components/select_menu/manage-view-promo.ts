import { StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { getUserRolesByInteraction } from "../../utils/user";


export default {
  data: new StringSelectMenuBuilder(),
  async execute(interaction: StringSelectMenuInteraction) {
    const selected_values = interaction.values;
    const user_roles = getUserRolesByInteraction(interaction);
    const user_role_manager = interaction.guild?.members.resolve(interaction.user.id)?.roles;
    for (const option of this.data.options) {
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
  },
  async build(course_name: string, associated_roles: any[]) {
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
  }
}