import { EmbedBuilder, HexColorString } from 'discord.js';
import { Guild } from "../guild";
const simplonIcon = Guild.YamlConfig.get()["simplon-icon"];
const simplonColorHex = Guild.YamlConfig.get()["simplon-color"];

class EmbedMessage extends EmbedBuilder {
	constructor(title: string, color: HexColorString, description: string, thumbnail?: string) {
		super();
        this.setTitle(title)
        this.setColor(color || simplonColorHex)
        this.setThumbnail(thumbnail || simplonIcon)
        this.setDescription(description)
        this.setTimestamp()
        this.setFooter({ text: 'Simplon HDF', iconURL: simplonIcon});
	}
}

export default EmbedMessage;