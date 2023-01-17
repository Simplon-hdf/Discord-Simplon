import { ActionRowBuilder, ButtonInteraction, Events, GuildMemberManager, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ModalSubmitInteraction) {
        if (!interaction.isModalSubmit() || interaction['customId'] != 'confirm-add-learner') return;
        const username : String = interaction.fields.getField('username-selection')['value'];
        console.log(await interaction.guild?.members.list());
        const list = interaction.client.guilds.resolve("1064635991320690799"); 
        // Iterate through the collection of GuildMembers from the Guild getting the username property of each member 
        console.log(await list?.members.list()); 
        await interaction.reply({content: 'Bien pris en compte !', ephemeral:true});
        setTimeout(async () => interaction.deleteReply(), 10000);
    }
}