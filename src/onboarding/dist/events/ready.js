import { Events } from "discord.js";
export default {
    name: Events.ClientReady,
    once: true,
    execute: function (client) {
        var _a;
        console.log("Ready! Logged in as " + ((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag));
    }
};
