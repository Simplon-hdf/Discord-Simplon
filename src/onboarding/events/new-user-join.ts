import {Events, GuildMember, Invite } from "discord.js";
import { set, get } from "../utils/json_utils.js";

export default {
    name: Events.GuildMemberAdd,
    on: true,
    async execute(member: GuildMember) {
        console.log('Oui');
        let invite = await member.guild.invites.fetch();
                let inviter = invite.find(i => i.uses === member.guild.members.cache.get(member.id)?.roles[0]._inviter.id);
                console.log(`${member.user.username} a rejoint en utilisant l'invitation ${inviter?.code} créée par ${inviter?.inviter?.username}`);
    }
}