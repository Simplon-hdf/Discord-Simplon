"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonBuilderClass = void 0;
const discord_js_1 = require("discord.js");
class ButtonBuilderClass {
    button;
    constructor() {
        this.button = new discord_js_1.ButtonBuilder();
    }
    setStyle(style) {
        this.button.setStyle(style);
        return this;
    }
    setLabel(label) {
        this.button.setLabel(label);
        return this;
    }
    setURL(url) {
        this.button.setURL(url);
        return this;
    }
    setDisabled(disabled) {
        this.button.setDisabled(disabled);
        return this;
    }
    setEmoji(emoji) {
        this.button.setEmoji(emoji);
        return this;
    }
    setCustomId(customId) {
        this.button.setCustomId(customId);
        return this;
    }
    build() {
        return this.button;
    }
}
exports.ButtonBuilderClass = ButtonBuilderClass;
