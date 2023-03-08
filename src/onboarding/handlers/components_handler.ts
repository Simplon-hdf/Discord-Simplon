import { REST, Routes, Collection, Client } from "discord.js";
import * as fs from "fs";
import * as path from 'path';
import * as dotenv from "dotenv";
import logger from "../utils/logger";

export default async (client: any) => {
    dotenv.config();

    const componentsFiles = getAllFiles('./build/components/');

    function getAllFiles(dirPath: any, arrayOfFiles?: any) {

        arrayOfFiles = arrayOfFiles || []
        try {

            const files = fs.readdirSync(dirPath)
            files.forEach(function (file) {
                if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                    arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
                } else {
                    arrayOfFiles.push(path.join(dirPath.replace("build/", ''), "/", file));
                }
            })

        } catch (error) {
            console.log(error);

        }
        return arrayOfFiles
    }

    client.components = new Collection();

    
    for (const file of componentsFiles) {
        const component = await import(`../${file}`);
        logger.info(`Loading component ${component.default.data.data.custom_id}`);
        client.components.set(component.default.data.data.custom_id, component.default); // Link cmd name to complete module
    }
}
