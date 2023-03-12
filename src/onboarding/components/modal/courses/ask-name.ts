import {
  ActionRowBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { HttpUtils } from '../../../utils/http';
import { HttpRoutes } from '../../../utils/routes/http-routes';
import logger from '../../../utils/logger';
import { Course } from '../../../courses/course';
import { DiscordClient } from '../../../client';
import EmbedMessage from '../../../embeds/embed-message';
import SelectConcernedPole from '../../select-menu/courses/select-channels';
import CustomComponent from '../../CustomComponent';

export default class AskNameModal extends CustomComponent {
  protected customId = 'courses-ask-name';
  protected data: any;

  protected component = new ModalBuilder()
    .setTitle('Nom de la formation')
    .setCustomId('courses-ask-name')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('courses-name')
          .setLabel('Nom de la formation')
          .setPlaceholder('Nom de la formation')
          .setStyle(TextInputStyle.Short)
          .setRequired(true),
      ),
    );
  async execute(interaction: ModalSubmitInteraction) {
    const name = interaction.fields.getTextInputValue('courses-name');
    const guild_uuid = interaction.guildId;

    const courses = await new HttpUtils()
      .get(HttpRoutes.GET_COURSES_BY_GUILD, guild_uuid!)
      .catch(logger.error);

    const courses_name = courses.data.map((course: any) =>
      course.name.toLocaleLowerCase(),
    );

    if (courses_name.includes(name.toLowerCase())) {
      await interaction.reply({
        content: 'Ce nom de formation est déjà utilisé',
        ephemeral: true,
      });
      return;
    }

    const client = DiscordClient.getInstance(interaction.user.id);
    console.log(client.getToken());

    const course = new Course(name);

    client.getCoursesManager().setCourse(course);

    const embed = new EmbedMessage(
      'Sélectionner les différents channel de la formation',
      '#ce0033',
      'Permet de sélectionner les channels de la formation',
      'https://cdn-icons-png.flaticon.com/512/624/624815.png',
    );

    const channelStock = new HttpUtils().get(
      HttpRoutes.GET_CHANNELS_STOCK,
      guild_uuid!,
    );

    const menu = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      (
        new SelectConcernedPole().get_component()
          .data as StringSelectMenuBuilder
      ).setOptions({
        label: 'test',
        value: 'test',
        description: 'test',
      }),
    );

    await interaction.reply({
      embeds: [embed],
      components: [menu],
      ephemeral: true,
    });
  }
}
