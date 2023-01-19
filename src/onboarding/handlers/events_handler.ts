/// <reference path="../events/ready.ts"/>
/// <reference path="../events/promo/promo_name_modal.ts"/>
/// <reference path="../events/promo/selection-formation-promo.ts"/>
/// <reference path="../events/promo/start_promo_creation.ts"/>
/// <reference path="../events/courses/start_course_creation.ts"/>
/// <reference path="../events/courses/create_course_template.ts"/>
/// <reference path="../events/courses/course_name_modals.ts"/>
/// <reference path="../events/courses/information_courses.ts"/>
/// <reference path="../events/identification/management/accept-id-req.ts"/>
/// <reference path="../events/identification/management/reject-id-req.ts"/>
/// <reference path="../events/identification/requesting/request-identification.ts"/>
/// <reference path="../events/identification/requesting/submit-identification.ts"/>

import * as fs from "fs";
import * as path from "path";

export default async (client) => {
    const dirPath = './onboarding/dist/events';
    const eventFiles : [] = getAllFiles(dirPath);


    function getAllFiles(dirPath, arrayOfFiles?){
        const files = fs.readdirSync(dirPath)

        arrayOfFiles = arrayOfFiles || []
      
        files.forEach(function(file) {
          if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(path.join(dirPath.replace('onboarding/dist', ''), "/", file))
          }
        })
      
        return arrayOfFiles
    }

    
    for (const file of eventFiles) {
        const event = await import('../' + file);
        if (event.default.once) {
            client.once(event.default.name, (...args) => event.default.execute(...args));
        } else {
            client.on(event.default.name, (...args) => event.default.execute(...args));
        }
    }
}