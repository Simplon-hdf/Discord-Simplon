import { Events, GuildMember } from "discord.js";
import { RolesIds } from "../utils/enums.js";

export default {
    name : Events.GuildMemberAdd,
    on: true,
    async execute(member: GuildMember) {
       member.roles.add(RolesIds.Unverified_User_Role);
    }
}