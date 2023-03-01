import MessageEmbed, {ColorResolvable, EmbedBuilder} from 'discord.js'

export class EmbedBuilderClass {
    private readonly embed: EmbedBuilder;

    constructor() {
        this.embed = new EmbedBuilder();
    }

    public setTitle(title: string): EmbedBuilderClass {
        this.embed.setTitle(title);
        return this;
    }

    public setDescription(description: string): EmbedBuilderClass {
        this.embed.setDescription(description);
        return this;
    }

    public setThumbnail(thumbnailUrl: string): EmbedBuilderClass {
        this.embed.setThumbnail(thumbnailUrl);
        return this;
    }

    public setImage(imageUrl: string): EmbedBuilderClass {
        this.embed.setImage(imageUrl);
        return this;
    }

    public setFooter(text: string, iconUrl?: string): EmbedBuilderClass {
        this.embed.setFooter({text: text, iconURL: iconUrl});
        return this;
    }

    public setTimestamp(timestamp?: Date | number): EmbedBuilderClass {
        this.embed.setTimestamp(timestamp);
        return this;
    }

    public setColor(color: ColorResolvable): EmbedBuilderClass {
        this.embed.setColor(color);
        return this;
    }

    public build(): EmbedBuilder {
        return this.embed;
    }
}


// How to use : const embed = new EmbedBuilder()
//   .setTitle('Titre de l\'embed')
//   .setDescription('Description de l\'embed')
//   .setImage('https://url-de-l-image.com/image.png')
//   .build();

// Puis : message.channel.send(embed);