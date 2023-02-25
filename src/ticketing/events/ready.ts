import { Events } from "discord.js";
import { client } from "../index";

const ready = client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});


export default ready;