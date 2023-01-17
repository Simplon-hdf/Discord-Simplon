/// <reference path="../events/ready.ts"/>
/// <reference path="../events/start_course_creation.ts"/>
/// <reference path="../events/create_course_template.ts"/>
/// <reference path="../events/course_name_modals.ts"/>
/// <reference path="../events/add-learner-to-class.ts"/>
/// <reference path="../events/confirm-add-learner.ts"/>

import * as fs from "fs";

export default async (client) => {
    const eventFiles = fs.readdirSync('./onboarding/dist/events').filter(e => e.endsWith('.js'));
        
        for(const file of eventFiles){
            const event = await import('../events/' + file);
            if(event.default.once){
                client.once(event.default.name, (...args) => event.default.execute(...args));
            } else {
                client.on(event.default.name, (...args) => event.default.execute(...args));
            }
        }
}