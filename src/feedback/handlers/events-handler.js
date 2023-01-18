import fs from "node:fs";

export default async (client) => {
    client.handleEvents = async () => {

        const eventFiles = fs.readdirSync('./events').filter(e => e.endsWith('.js'));
        
        for(const file of eventFiles){
            const event = await import('../events/' + file);
        
            if(event.default.once){
                client.once(event.default.name, (...args) => event.default.execute(...args));
            } else {
                client.on(event.default.name, (...args) => event.default.execute(...args));
            }
        }        
    }
}