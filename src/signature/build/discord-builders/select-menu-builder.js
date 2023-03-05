"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMenu = void 0;
const discord_js_1 = require("discord.js");
class SelectMenu extends discord_js_1.StringSelectMenuBuilder {
    constructor(customId, placeholder, options, minValue, maxValue) {
        super();
        this.setCustomId(customId);
        this.setPlaceholder(placeholder);
        this.setOptions(options);
        this.setMinValues(minValue || 0);
        this.setMaxValues(maxValue || 999999);
    }
}
exports.SelectMenu = SelectMenu;
