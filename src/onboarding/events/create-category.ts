import {Events, Interaction} from "discord.js";
import logger from "../utils/logger";

export default {
  name: 'create-category',
  on: Events.ChannelCreate,
  async execute(interaction: Interaction) {
    const bot_id = interaction.client.application.id;

    if(interaction.user.id === bot_id) logger.debug('Bot event create category');
  }
}