import {ButtonBuilder, ButtonStyle} from 'discord.js';

class ButtonBuilderClass {
    private readonly button: ButtonBuilder

    constructor() {
        this.button = new ButtonBuilder();
    }

    public setStyle(style: ButtonStyle): ButtonBuilderClass {
        this.button.setStyle(style);
        return this;
    }

    public setLabel(label: string): ButtonBuilderClass {
        this.button.setLabel(label);
        return this;
    }

    public setURL(url: string): ButtonBuilderClass{
        this.button.setURL(url);
        return this;
    }

    public setDisabled(disabled: boolean): ButtonBuilderClass {
        this.button.setDisabled(disabled);
        return this;
    }

    public setEmoji(emoji: string): ButtonBuilderClass{
        this.button.setEmoji(emoji);
        return this;
    }

    public setCustomId(customId: string): ButtonBuilderClass {
        this.button.setCustomId(customId);
        return this;
    }

    public build(): ButtonBuilder {
        return this.button;
    }
}
