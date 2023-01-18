/// <reference path="../events/ready.ts"/>
/// <reference path="../events/add-learner-to-class.ts"/>
/// <reference path="../events/selected-role.ts"/>
/// <reference path="../events/request-identification.ts"/>
/// <reference path="../events/submit-identification.ts"/>
/// <reference path="../events/accept-id-req.ts"/>
/// <reference path="../events/reject-id-req.ts"/>

import * as fs from "fs";

export default async (client) => {
    const eventFiles = fs.readdirSync('./onboarding/dist/events').filter(file_name => file_name.endsWith('js'));

    for (const file of eventFiles) {
        console.log(file);

        const event = await import(`../events/${file}`);
        if (event.default.once) {
            client.once(event.default.name, (...args) => event.default.execute(...args));
        } else {
            client.on(event.default.name, (...args) => event.default.execute(...args));
        }
    }
}