/// <reference path="../events/ready.ts"/>
/// <reference path="../events/promo/request_name_promo.ts"/>
/// <reference path="../events/promo/handle_select_formation_promo.ts"/>
/// <reference path="../events/channel_selector/handler_channel_selector.ts"/>
/// <reference path="../events/promo/button_promo_creation.ts"/>
/// <reference path="../events/courses/button_course_creation.ts"/>
/// <reference path="../events/courses/create_course_template.ts"/>
/// <reference path="../events/courses/request_course_name.ts"/>
/// <reference path="../events/courses/handler_course_information.ts"/>
/// <reference path="../events/identification/management/accept-id-req.ts"/>
/// <reference path="../events/identification/management/reject-id-req.ts"/>
/// <reference path="../events/identification/management/select-role-new-user.ts"/>
/// <reference path="../events/identification/requesting/request-identification.ts"/>
/// <reference path="../events/identification/requesting/submit-identification.ts"/>
/// <reference path="../events/add-learner-to-class.ts"/>
/// <reference path="../events/confirm-add-learner.ts"/>
/// <reference path="../events/selected-role.ts"/>
/// <reference path="../events/user-join.ts"/>

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