import { ActionRowBuilder, APISelectMenuOption, ChannelType, Events, Message, ModalSubmitInteraction, RestOrArray, SelectMenuComponentOptionData, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js"
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

        if(formation_data[formation_name]['promos'] == undefined){
            formation_data[formation_name]['promos'] = [promo_name]
        }else{
            formation_data[formation_name]['promos'].push(promo_name);
        }


        set('./config_courses.json', 'formations', formation_data);
    
        await interaction.reply({ephemeral : true, content : 'Votre promo a bien été créée'})

4    }
}