import {ButtonInteraction, Events, PermissionsBitField} from "discord.js";
import {Learner} from "../users/learner";
import EmbedMessage from "../discord-builders/embed-builder";


export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {
        if (!interaction.isButton() || interaction['customId'] != 'start') return;

        const learner = new Learner(interaction.user.id);
        const interactionChannel = interaction.channel?.id as string;

        const memberRole = interaction.guild?.members.me?.permissionsIn(interactionChannel).has(PermissionsBitField.Flags.SendMessages)

        if (!memberRole) {
            const codeRequestStatus = await learner.getCodeRequestStatus()
            if (codeRequestStatus) {

                const hasReport = await learner.hasReport();
                console.log(hasReport);

                if (!hasReport) {

                    // TODO : learner.getTrainers();

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
