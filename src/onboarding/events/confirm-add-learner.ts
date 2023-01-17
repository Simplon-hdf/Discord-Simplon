<<<<<<< HEAD
import { ActionRowBuilder, ButtonInteraction, Events, Guild, GuildMemberManager, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
=======
import { ActionRowBuilder, ButtonInteraction, Events, GuildMemberManager, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
>>>>>>> f2c648d (feat(common): add formation learner first interface version)

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ModalSubmitInteraction) {
        if (!interaction.isModalSubmit() || interaction['customId'] != 'confirm-add-learner') return;
        const username : String = interaction.fields.getField('username-selection')['value'];
        console.log(await interaction.guild?.members.list());
<<<<<<< HEAD
        const list = await interaction.client.guilds.resolve(interaction.guild as Guild).members.cache;
        // Iterate through the collection of GuildMembers from the Guild getting the username property of each member 
        console.log(list.toJSON()); 
=======
        const list = interaction.client.guilds.resolve("1064635991320690799"); 
        // Iterate through the collection of GuildMembers from the Guild getting the username property of each member 
        console.log(await list?.members.list()); 
>>>>>>> f2c648d (feat(common): add formation learner first interface version)
        await interaction.reply({content: 'Bien pris en compte !', ephemeral:true});
        setTimeout(async () => interaction.deleteReply(), 10000);
    }
}