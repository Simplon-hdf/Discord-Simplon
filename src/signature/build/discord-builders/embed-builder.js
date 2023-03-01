"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class EmbedBuilderClass {
    embed;
    constructor() {
        this.embed = new discord_js_1.EmbedBuilder();
    }
    setTitle(title) {
        this.embed.setTitle(title);
        return this;
    }
    setDescription(description) {
        this.embed.setDescription(description);
        return this;
    }
    setThumbnail(thumbnailUrl) {
        this.embed.setThumbnail(thumbnailUrl);
        return this;
    }
    setImage(imageUrl) {
        this.embed.setImage(imageUrl);
        return this;
    }
    setFooter(text, iconUrl) {
        this.embed.setFooter({ text: text, iconURL: iconUrl });
        return this;
    }
    setTimestamp(timestamp) {
        this.embed.setTimestamp(timestamp);
        return this;
    }
    setColor(color) {
        this.embed.setColor(color);
        return this;
    }
    build() {
        return this.embed;
    }
}
// How to use : const embed = new EmbedBuilder()
//   .setTitle('Titre de l\'embed')
//   .setDescription('Description de l\'embed')
//   .setImage('https://url-de-l-image.com/image.png')
//   .build();
// Puis : message.channel.send(embed);
