import { ChannelType, Events, ModalSubmitInteraction, Colors, PermissionFlagsBits, RestOrArray, StringSelectMenuOptionBuilder, APISelectMenuOption, SelectMenuComponentOptionData, TextChannel, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js"
import { set, get } from "../../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ModalSubmitInteraction) {
        if (!interaction.isModalSubmit() || interaction['customId'] != 'choice-promo-name') return;

        const user_id = interaction.user.id;
        const promo_name = interaction.fields.getTextInputValue('input-name-promo');

        const data = await get('./config_promo.json');
        const user_data = data[user_id];

        const formation_name = user_data['formation_name'];
        const promo_data = data['promos'] = promo_name;

        set('./config_promo.json', 'promos', promo_data);

        const courses_data = await get('./config_courses.json');

        const formation_data = courses_data['formations'];

        if (formation_data[formation_name]['promos'] == undefined) {
            formation_data[formation_name]['promos'] = [promo_name]
        } else {
            formation_data[formation_name]['promos'].push(promo_name);
        }


        set('./config_courses.json', 'formations', formation_data);

        const channels: string[] = formation_data[formation_name]['channels'];

        await interaction.guild?.roles.create({
            name: promo_name,
            color: Colors.Green,
            reason: 'Role pour la nouvelle promotion "' + promo_name + "."
        });

        const roles = await interaction.guild?.roles.cache.find(r => r.name === promo_name);

        await interaction.guild?.channels.create({
            name: promo_name,
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                {
                    id: roles?.id!,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                },
            ],
        });

        const categorie_id = await interaction.guild?.channels.cache.find(r => r.name === promo_name)?.id;


        channels.forEach(async channel => {

            const channel_info = await interaction.guild?.channels.fetch(channel)!;
            const channel_type: number = channel_info?.type.valueOf()!

            interaction.guild?.channels.create({
                name: channel_info?.name!,
                type: channel_type!,
                parent: categorie_id,
                permissionOverwrites: [
                    {
                        id: roles?.id!,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                    },
                ],
            });
        })

        const message_info_selector = data['message_info_selector'];
        const channel_info_selector = data['channel_info_selector'];

        if (message_info_selector != undefined) {
            const options: RestOrArray<StringSelectMenuOptionBuilder | APISelectMenuOption | SelectMenuComponentOptionData> = [];

            formation_data[formation_name]['promos'].forEach(promo => {
                options.push({
                    label: promo,
                    description: 'Promotion au nom de ' + promo,
                    value: promo
                })
            });

            const row = new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('onboarding-selector')
                        .setPlaceholder('Selectionner vos channels')
                        .addOptions(options)
                )

            interaction.channel?.messages
            const channel = interaction.guild?.channels.cache.find(channel => channel.id == channel_info_selector);

            if (channel?.isTextBased()) {
                (await channel.messages.fetch(message_info_selector)).edit({ components: [row] });
            }
        }
        await interaction.reply({ ephemeral: true, content: 'Votre promo a bien été créée' });

    }
}