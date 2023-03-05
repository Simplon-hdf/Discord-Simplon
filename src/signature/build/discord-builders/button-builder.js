"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonBuilderClass = void 0;
const discord_js_1 = require("discord.js");
class ButtonBuilderClass extends discord_js_1.ButtonBuilder {
    constructor(customId, style, label, url, emoji) {
        super();
        this.setCustomId(customId);
        this.setStyle(style);
        this.setLabel(label);
        this.setURL(url || '');
        this.setEmoji(emoji || '');
    }
}
exports.ButtonBuilderClass = ButtonBuilderClass;
