"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class SelectMenuBuilder {
    customId;
    placeholder;
    options;
    constructor({ customId, placeholder, options }) {
        this.customId = customId;
        this.placeholder = placeholder || '';
        this.options = options;
    }
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }
    build() {
        const options = this.options.map((option) => ({
            label: option.label,
            value: option.value,
        }));
        const selectMenu = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId(this.customId)
            .setPlaceholder(this.placeholder)
            .addOptions(options);
        return new discord_js_1.ActionRowBuilder().addComponents(selectMenu);
    }
}
