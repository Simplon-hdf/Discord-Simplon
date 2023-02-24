/// <reference path="../events/ready.ts"/>

import * as fs from "fs";
import * as path from "path";

export default async (client: any) => {

    const dirPath = './onboarding/build/events';
    const eventFiles : [] = getAllFiles(dirPath);


    function getAllFiles(dirPath: any, arrayOfFiles?: any){
        const files = fs.readdirSync(dirPath)

        arrayOfFiles = arrayOfFiles || []
      
        files.forEach(function(file) {
          if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(path.join(dirPath.replace('onboarding/build', ''), "/", file))
          }
        })
      
        return arrayOfFiles
    }

    
    for (const file of eventFiles) {
        const event = await import('../' + file);
        if (event.default.once) {
            client.once(event.default.name, (...args: any[]) => event.default.execute(...args));
        } else {
            client.on(event.default.name, (...args: any[]) => event.default.execute(...args));
        }
    }
}
