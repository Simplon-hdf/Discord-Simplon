import {ButtonBuilder, ButtonStyle} from 'discord.js';

 export class ButtonBuilderClass extends ButtonBuilder {


    constructor(customId: string, style: ButtonStyle, label: string, url?: string, emoji?: string ) {
        super();
        this.setCustomId(customId)
        this.setStyle(style)
        this.setLabel(label)
        this.setURL(url || '')
        this.setEmoji(emoji || '')
    }
}
