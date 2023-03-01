import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    GuildMember,
    Interaction,
    StringSelectMenuBuilder
} from "discord.js";
import {ButtonBuilderClass} from "./discord-builders/button-builder";
import {EmbedBuilderClass} from "./discord-builders/embed-builder";
import {Promo} from "./promo/promo";
import {Trainer} from "./users/trainer";


export const onInteraction = async (interaction: Interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'active') {
            const beginProcedure = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Commencer la procédure de rappel de signature")
                .setDescription(
                    `\n\n Bonjour ${interaction.member?.user.username}, \n\n pour commencer la procédure de rappel de signature veuillez cliquer sur le bouton ci-dessous.`
                )
                .setThumbnail(
                    "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
                );

            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId("start")
                    .setLabel("Commencer la procédure !")
                    .setStyle(ButtonStyle.Success)
            );
            await interaction.reply({embeds: [beginProcedure], components: [row]});
        }
    } if (interaction.isButton()){
        const guild = interaction.guild;
        const trainerRole = guild?.roles.cache.has('1064925613120557196');

        const member = interaction.member as GuildMember;

        if (member) {
            const roles = member.roles.cache
            if (trainerRole) {

                let trainer = new Trainer(interaction.member?.user.id ?? '', interaction.member?.roles.toString() ?? '1064925613120557196')

                let trainerPromos = trainer.getPromoUuId();

                const selectPromosEmbed = new EmbedBuilder()
                    .setColor(0x0099ff)
                    .setTitle("Sélection des apprenants pour Rappel")
                    .setDescription(
                        `\n\n Bonjour ${interaction.member?.user.username}, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer dans la liste de sélection ci-dessous.`
                    )
                    .setThumbnail(
                        "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
                    );

                const selectPromoRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select_promo')
                        .setPlaceholder('Aucune promotion n\'est actuellement selectionnée')
                        .setMinValues(1)
                        //.setMaxValues()
                        .addOptions({label: "test", value: "test"})
                )
                await interaction.reply({
                    embeds: [selectPromosEmbed],
                    components: [selectPromoRow],
                    ephemeral: true,
                });
            } if (interaction.isAnySelectMenu()) {
                let promoUuid = interaction.
                    let promo = new Promo();

                const embedReminder = new EmbedBuilder()
                    .setColor(0x0099ff)
                    .setTitle("Sélection des apprenants pour Rappel")
                    .setDescription(
                        `\n\n Bonjour ${interaction.member?.user.username}, \n\n Veuillez sélectionner les apprenants à qui il faut rappeler de signer dans la liste de sélection ci-dessous.`
                    )
                    .setThumbnail(
                        "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
                    );

                const selectLearnersRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("select_learners")
                        .setPlaceholder("Aucune réponse n'est actuellement sélectionnée !")
                        .setMinValues(1)
                        //.setMaxValues(learner_list.length)
                        .addOptions(
                            {label: 'Option 1', value: 'option_1'},
                            {label: 'Option 2', value: 'option_2'},
                            {label: 'Option 3', value: 'option_3'}
                            /*learner_list.map((learner) => {
                                return {
                                    label: `[${learner.firstname} ${learner.lastname}]`,
                                    description: `Formation: ${
                                        interaction.guild.roles.cache.get(learner.roles).name
                                    }`,
                                    value: `${learner.discord_id}, ${learner.firstname}, ${
                                        learner.lastname
                                    }, ${
                                        interaction.guild.roles.cache.get(learner.roles).name
                                    }, ${interaction.member.displayName}`,
                                };
                            }*/)
                )
                await interaction.reply({
                    embeds: [embedReminder],
                    components: [selectLearnersRow],
                    ephemeral: true,
                });
            }
        }
    } if (interaction.isAnySelectMenu()) {

    }

};