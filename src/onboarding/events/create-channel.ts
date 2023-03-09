import {Events, Interaction} from "discord.js";
import logger from "../utils/logger";

export default {
  name: Events.ChannelCreate,
  on: true,
  async execute(interaction: Interaction) {

    logger.debug(interaction.member?.user.bot === undefined)
    logger.debug('Bot event create category')

  }
}