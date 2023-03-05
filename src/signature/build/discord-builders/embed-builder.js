"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class EmbedMessage extends discord_js_1.EmbedBuilder {
    constructor(title, color, description, thumbnail) {
        super();
        this.setTitle(title);
        this.setColor(color);
        this.setThumbnail(thumbnail || "https://simplon.co/favicon.png");
        this.setDescription(description);
        this.setTimestamp();
        this.setFooter({ text: 'Simplon HDF', iconURL: "https://simplon.co/favicon.png" });
    }
}
exports.default = EmbedMessage;
