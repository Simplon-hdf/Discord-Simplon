/// <reference path="../commands/ping_cmd.ts"/>

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