import { REST, Routes, Collection } from "discord.js";
import * as fs from "fs";
import * as path from 'path';
import * as dotenv from "dotenv";

export default async (client : any, discord_token?: any, discord_client_id?: any) => {
    dotenv.config();
    
    const commandFiles = getAllFiles('./build/commands/')

    function getAllFiles(dirPath : any, arrayOfFiles? : any){
        const files = fs.readdirSync(dirPath)

        arrayOfFiles = arrayOfFiles || []
      
        files.forEach(function(file) {
          if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(path.join(dirPath.replace('/build', ''), "/", file))
          }
        })
      
        return arrayOfFiles
    }
    
    client.commands = new Collection();

    for (const file of commandFiles) {
        // console.log(file);
        const cmd = await import(`../${file}`);
        //console.log(cmd.default);
        client.commands.set(cmd.default.data.name, cmd.default); // Link cmd name to complete module

        setTimeout(() => {
            console.log(" ")
            console.log("---------------[ COMMAND(S) ]---------------")
            console.table(commandFiles)
            console.log(`[COMMANDS] => ${commandFiles.length} command(s) has been charged !`)
            console.log(" ")
          }, 1000)
    }

    if(!discord_token && !discord_client_id){
        throw new Error('Discord id or token is undefined');  

    }

    const rest = new REST({ version: '10' }).setToken(discord_token);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands(discord_client_id), { body: client.commands.map((x: any) => x.data.toJSON())}); //Logging commands on RESTAPI (for each values in commands, get data.JSON() to register it

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}
