import {
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  StringSelectMenuOptionBuilder,
} from 'discord.js';
import CustomComponent from '../CustomComponent';

export default class ManagePromoViewMenu extends CustomComponent {
  protected customId = '';
  protected component: StringSelectMenuBuilder = new StringSelectMenuBuilder();
  protected data: any;

  async execute(interaction: StringSelectMenuInteraction) {
    const selected_values = interaction.values;
    const user_role_manager = interaction.guild?.members.resolve(
      interaction.user.id,
    )?.roles;
    for (const option of this.component.options!) {
      const option_value: string = option.data.value as string;
      if (selected_values.includes(option_value)) {
        user_role_manager?.add(option_value);
      } else {
        user_role_manager?.remove(option_value);
      }
    }
    await interaction.reply({
      ephemeral: true,
      content: 'Vos rôles ont étés mis à jour',
    });
    setTimeout(async () => {
      try {
        await interaction.deleteReply();
      } catch {}
    }, 2000);
  }
  build(course_name: string, associated_roles: any[]) {
    this.component.setPlaceholder(course_name);
    this.customId = `course-${course_name}`;
    this.component.setCustomId(`course-${course_name}`);
    for (const associated_role of associated_roles) {
      this.component.addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(associated_role['role_name'])
          .setValue(associated_role['role_uuid']),
      );
    }
    if (this.component.options.length == 0) return;
    this.component.setMinValues(0);
    this.component.setMaxValues(
      this.component.options.length >= 25 ? 20 : this.component.options.length,
    );
  }
}
