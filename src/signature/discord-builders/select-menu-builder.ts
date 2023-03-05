import {
    EmbedBuilder,
    HexColorString,
    SelectMenuComponentOptionData,
    StringSelectMenuBuilder
} from 'discord.js';

export class SelectMenu extends StringSelectMenuBuilder {
    constructor(customId: string, placeholder: string, options: any, minValue?: number, maxValue?: number, ) {
        super();
        this.setCustomId(customId)
        this.setPlaceholder(placeholder)
        this.setOptions(options)
        this.setMinValues(minValue || 0)
        this.setMaxValues(maxValue || 999999)
    }
}

