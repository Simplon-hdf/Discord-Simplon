import { EmbedBuilder, HexColorString } from 'discord.js';

class EmbedMessage extends EmbedBuilder {
	constructor(title: string, color: HexColorString, description: string, thumbnail?: string) {
		super();
        this.setTitle(title)
        this.setColor(color)
        this.setThumbnail(thumbnail || "https://simplon.co/favicon.png")
        this.setDescription(description)
        this.setTimestamp()
        this.setFooter({ text: 'Simplon HDF', iconURL: "https://simplon.co/favicon.png"});
	}
}

export default EmbedMessage;