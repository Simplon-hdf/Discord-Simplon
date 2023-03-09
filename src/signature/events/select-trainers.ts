import {ActionRowBuilder, ButtonInteraction, Events, PermissionsBitField, StringSelectMenuBuilder} from "discord.js";
import {Learner} from "../users/learner";
import EmbedMessage from "../discord-builders/embed-builder";



export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {
        const learner = new Learner(interaction.user.id)
        const interactionChannel = interaction.channel?.id as string;
        const learnerRole = interaction.guild?.members.me?.permissionsIn(interactionChannel).has(PermissionsBitField.Flags.CreatePrivateThreads);

        if (!learnerRole) {
        if (!interaction.isButton() || interaction['customId'] !== 'learner') return;


            const codeRequestStatus = await learner.getCodeRequestStatus()

            if (codeRequestStatus) {

                const hasReport = await learner.hasReport();

                if (!hasReport) {

                    const trainerList = await learner.getTrainers()


                    const selectTrainer = new EmbedMessage(
                        "Sélection du formateur pour rappel",
                        '#0x0099ff',
                        `\n\n Veuillez sélectionner le formateur à qui envoyer un rappel dans la liste ci-dessous.`,
                        "https://cdn-icons-png.flaticon.com/512/4489/4489772.png"
                    )

                    const selectTrainerRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("select_trainer")
                            .setPlaceholder("Aucune réponse n'est actuellement sélectionnée !")
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions(trainerList.map((trainer: any) => {
                                    return {
                                        label: `[${trainer.username}]`,
                                        description: `Envoyer un rappel à ${trainer.username}`,
                                        value: `${trainer.user_uuid}`,
                                    };
                                })
                            ))
                    await interaction.reply({
                        embeds: [selectTrainer],
                        components: [selectTrainerRow],
                        ephemeral: true,
                    });

                } else {
                    const everReport = new EmbedMessage(
                        'Code déjà demandé!',
                        '#0x0099ff',
                        'Oups! Il semble que vous ayez déjà demandé le code cette demi-journée, un conseil, parlez-en à vos collègues!',
                        'https://img.icons8.com/ios-filled/100/null/sad.png'
                    )
                    await interaction.reply({embeds: [everReport], ephemeral: true})
                }

            } else {
                const isNotActivate = new EmbedMessage(
                    'Demande de code indisponible !',
                    '#0x0099ff',
                    `Désolé ${interaction.user.username}, il semble que le code vous ai déjà été donné!`,
                    "https://img.icons8.com/ios-filled/100/null/sad.png"
                    )
                await interaction.reply({ embeds: [isNotActivate], ephemeral: true });
            }
        }
    }
}
