import {
    ActionRowBuilder, StringSelectMenuBuilder,
} from 'discord.js';

interface SelectMenuOption {
    label: string;
    value: string;
}

interface SelectMenuOptions {
    customId: string;
    placeholder?: string;
    options: SelectMenuOption[];
}

class SelectMenuBuilder {
    private readonly customId: string;
    private placeholder: string;
    private readonly options: SelectMenuOption[];

    constructor({ customId, placeholder, options }: SelectMenuBuilder) {
        this.customId = customId;
        this.placeholder = placeholder || '';
        this.options = options;
    }

    public setPlaceholder(placeholder: string): SelectMenuBuilder {
        this.placeholder = placeholder;
        return this;
    }

    public build(): ActionRowBuilder {
        const options: SelectMenuOption[] = this.options.map((option) => ({
            label: option.label,
            value: option.value,
        }));

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(this.customId)
            .setPlaceholder(this.placeholder)
            .addOptions(options);

        return new ActionRowBuilder().addComponents(selectMenu);
    }
}
